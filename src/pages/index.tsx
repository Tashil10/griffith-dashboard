import Head from 'next/head'
import { useState } from 'react'
import Header from '@/components/Header'
import StatCard from '@/components/StatCard'
import SessionModal from '@/components/SessionModal'
import { useData } from '@/hooks/useData'
import { useCurrency } from '@/hooks/useCurrency'
import { useTimePeriod } from '@/hooks/useTimePeriod'
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#000000', '#404040', '#808080']

export default function Home() {
  const { data, loading } = useData()
  const { symbol, convert } = useCurrency()
  const { period, setPeriod, filtered } = useTimePeriod(data)
  const [showModal, setShowModal] = useState(false)

  const displayData = filtered || data

  if (loading) {
    return (
      <>
        <Head><title>Griffith Dashboard</title></Head>
        <Header />
        <div className="h-screen flex items-center justify-center">
          <p className="text-gray-400">Loading data...</p>
        </div>
      </>
    )
  }

  if (!displayData) {
    return (
      <>
        <Head><title>Griffith Dashboard</title></Head>
        <Header />
        <div className="h-screen flex items-center justify-center">
          <p className="text-gray-400">No data available</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Head><title>Griffith Dashboard</title></Head>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-3">Dashboard</h2>
            <p className="text-gray-400 max-w-2xl">
              Track your AI model usage in real-time. This dashboard aggregates all your OpenClaw sessions and shows detailed metrics across your preferred models (Griffith, Femto, and Godhand). Monitor costs, token consumption, and session history to optimize your AI workflow.
            </p>
          </div>

          <div className="mb-8 flex gap-2 flex-wrap">
            {[
              { key: 'day', label: 'Day' },
              { key: 'week', label: 'Week' },
              { key: 'month', label: 'Month' },
              { key: 'all', label: 'All Time' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setPeriod(key)}
                className={`px-4 py-2 rounded-lg transition font-medium ${
                  period === key
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-900 text-gray-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard label="Total Cost" value={`${symbol}${convert(parseFloat(displayData.totalCost))}`} />
            <StatCard label="Total Tokens" value={displayData.totalTokens > 1000000 ? (displayData.totalTokens / 1000000).toFixed(1) + 'M' : displayData.totalTokens > 1000 ? (displayData.totalTokens / 1000).toFixed(0) + 'K' : displayData.totalTokens} />
            <StatCard label="Sessions" value={displayData.totalSessions} />
            <StatCard label="Primary Model" value="Griffith" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {displayData.modelDistribution && displayData.modelDistribution.length > 0 && (
              <div className="glass p-8 rounded-2xl">
                <h3 className="text-lg font-semibold mb-2">Model Distribution</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Shows the percentage breakdown of sessions across your AI models. Each model has different capabilities and pricing tiers. Griffith is your lightweight, fast model for simple tasks. Femto is your general-purpose model for most work. Godhand is your premium model for complex reasoning.
                </p>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={displayData.modelDistribution} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                      {displayData.modelDistribution.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {displayData.modelDistribution && (
              <div className="glass p-8 rounded-2xl">
                <h3 className="text-lg font-semibold mb-6">Model Breakdown</h3>
                <div className="space-y-4">
                  {displayData.modelDistribution.map(m => (
                    <div key={m.name} className="border-b border-gray-900 pb-4 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold">{m.name}</span>
                        <span className="text-gray-400 text-sm">{m.value}%</span>
                      </div>
                      <div className="text-sm text-gray-400 space-y-1">
                        <div className="flex justify-between">
                          <span>Sessions:</span>
                          <span>{m.count}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tokens:</span>
                          <span>{(m.tokens / 1000000).toFixed(2)}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cost:</span>
                          <span>{symbol}{convert(m.cost)}</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-gray-900">
                          <span>Cost per 1K tokens:</span>
                          <span className="font-mono">{symbol}{convert(parseFloat(m.costPerToken) * 1000)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {displayData.recentSessions && displayData.recentSessions.length > 0 && (
            <div className="glass p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Recent Sessions</h3>
                  <p className="text-gray-400 text-sm">
                    Your recent AI sessions showing when they occurred, which model was used, token count, and cost. Each row represents one complete interaction with your selected model.
                  </p>
                </div>
              </div>
              <table className="w-full text-sm mb-6">
                <thead>
                  <tr className="border-b border-gray-900">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Model</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Tokens</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {displayData.recentSessions.slice(0, 10).map((row, i) => (
                    <tr key={i} className="border-b border-gray-900/30 hover:bg-gray-900/20 transition">
                      <td className="py-3 px-4">{row.date}</td>
                      <td className="py-3 px-4">{row.model}</td>
                      <td className="py-3 px-4">{row.tokens.toLocaleString()}</td>
                      <td className="py-3 px-4">{symbol}{convert(parseFloat(row.cost))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {displayData.recentSessions.length > 10 && (
                <button 
                  onClick={() => setShowModal(true)} 
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 rounded-lg transition font-medium"
                >
                  View More ({displayData.recentSessions.length} total)
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      <SessionModal sessions={displayData.recentSessions || []} isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
