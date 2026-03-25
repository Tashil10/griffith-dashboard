#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const os = require('os');

const SESSION_FILE = path.join(os.homedir(), '.openclaw/agents/main/sessions/d836aad4-2d7e-48c9-a49d-25c7c93d4627.jsonl');

async function parseSessionData() {
  const stats = {
    totalCost: 0,
    totalTokens: 0,
    totalSessions: 0,
    modelBreakdown: {},
    dailyTrend: {},
    recentSessions: []
  };

  const modelColors = {
    'anthropic/claude-haiku-4.5': 'Griffith',
    'anthropic/claude-sonnet-4.6': 'Femto',
    'anthropic/claude-opus-4.6': 'Godhand',
    'meta-llama/llama-3.3-70b-instruct:free': 'Llama'
  };

  try {
    const fileStream = fs.createReadStream(SESSION_FILE);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      try {
        const entry = JSON.parse(line);
        
        if (entry.type === 'message' && entry.message?.usage?.cost?.total) {
          const usage = entry.message.usage;
          const model = entry.message.model;
          const timestamp = new Date(entry.timestamp);
          const dateKey = timestamp.toISOString().split('T')[0];
          
          stats.totalCost += usage.cost.total || 0;
          stats.totalTokens += usage.totalTokens || 0;
          stats.totalSessions += 1;
          
          const modelName = modelColors[model] || model;
          if (!stats.modelBreakdown[modelName]) {
            stats.modelBreakdown[modelName] = { count: 0, cost: 0, tokens: 0 };
          }
          stats.modelBreakdown[modelName].count += 1;
          stats.modelBreakdown[modelName].cost += usage.cost.total || 0;
          stats.modelBreakdown[modelName].tokens += usage.totalTokens || 0;
          
          if (!stats.dailyTrend[dateKey]) {
            stats.dailyTrend[dateKey] = 0;
          }
          stats.dailyTrend[dateKey] += usage.cost.total || 0;
          
          stats.recentSessions.push({
            date: timestamp.toISOString().slice(0, 16),
            model: modelName,
            tokens: usage.totalTokens || 0,
            cost: (usage.cost.total || 0).toFixed(2)
          });
        }
      } catch (e) {}
    }
  } catch (err) {
    console.error('Error:', err.message);
    return null;
  }

  stats.recentSessions = stats.recentSessions.slice(-20).reverse();
  stats.totalCost = parseFloat(stats.totalCost.toFixed(2));
  stats.totalTokens = Math.round(stats.totalTokens / 1000) + 'K';
  
  const totalSessions = Object.values(stats.modelBreakdown).reduce((sum, m) => sum + m.count, 0);
  stats.modelDistribution = Object.entries(stats.modelBreakdown).map(([name, data]) => ({
    name,
    value: Math.round((data.count / totalSessions) * 100),
    count: data.count,
    cost: parseFloat(data.cost.toFixed(2))
  }));

  const sortedDates = Object.keys(stats.dailyTrend).sort().slice(-30);
  stats.costTrendData = sortedDates.map(date => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    cost: parseFloat(stats.dailyTrend[date].toFixed(2))
  }));

  return stats;
}

async function main() {
  console.log('📊 Parsing OpenClaw session data...');
  const data = await parseSessionData();
  
  if (!data) {
    console.error('Failed to parse');
    process.exit(1);
  }

  const dataDir = path.join(__dirname, 'public', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'data.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log('✅ Synced');
  console.log(`   Cost: $${data.totalCost}`);
  console.log(`   Tokens: ${data.totalTokens}`);
  console.log(`   Sessions: ${data.totalSessions}`);
}

main().catch(console.error);
