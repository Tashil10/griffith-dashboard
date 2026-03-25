import { useState, useMemo } from 'react'

export function useTimePeriod(data) {
  const [period, setPeriod] = useState('all')

  const filtered = useMemo(() => {
    if (!data) return null

    const now = new Date()
    let startDate = new Date(0)

    switch (period) {
      case 'day':
        startDate = new Date(now)
        startDate.setHours(0, 0, 0, 0)
        break
      case 'week':
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 7)
        break
      case 'month':
        startDate = new Date(now)
        startDate.setMonth(now.getMonth() - 1)
        break
      case 'all':
      default:
        startDate = new Date(0)
    }

    const filteredSessions = data.recentSessions.filter(s => {
      const date = new Date(s.date)
      return date >= startDate
    })

    let totalCost = 0
    let totalTokens = 0
    const modelBreakdown = {
      Griffith: { count: 0, cost: 0, tokens: 0 },
      Femto: { count: 0, cost: 0, tokens: 0 },
      Godhand: { count: 0, cost: 0, tokens: 0 }
    }

    filteredSessions.forEach(s => {
      totalCost += parseFloat(s.cost)
      totalTokens += s.tokens
      if (!modelBreakdown[s.model]) {
        modelBreakdown[s.model] = { count: 0, cost: 0, tokens: 0 }
      }
      modelBreakdown[s.model].count += 1
      modelBreakdown[s.model].cost += parseFloat(s.cost)
      modelBreakdown[s.model].tokens += s.tokens
    })

    const modelDist = Object.entries(modelBreakdown).map(([name, m]) => ({
      name,
      value: filteredSessions.length > 0 ? Math.round((m.count / filteredSessions.length) * 100) : 0,
      count: m.count,
      cost: parseFloat(m.cost.toFixed(2)),
      tokens: m.tokens,
      costPerToken: m.tokens > 0 ? (m.cost / m.tokens).toFixed(6) : '0'
    }))

    return {
      totalCost: totalCost.toFixed(2),
      totalTokens,
      totalSessions: filteredSessions.length,
      modelDistribution: modelDist,
      recentSessions: filteredSessions
    }
  }, [data, period])

  return { period, setPeriod, filtered }
}
