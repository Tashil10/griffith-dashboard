import Head from 'next/head'
import { useState } from 'react'
import Header from '@/components/Header'
import StatCard from '@/components/StatCard'
import SessionModal from '@/components/SessionModal'
import { useData } from '@/hooks/useData'
import { useCurrency } from '@/hooks/useCurrency'
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#000000', '#404040', '#808080']

export default function Home() {
  const { data, loading } = useData()
  const { symbol, convert } = useCurrency()
  const [showModal, setShowModal] = useState(false)

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

  if (!data) {
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard label="Total Cost" value={`${symbol}${convert(data.totalCost)}`} />
            <StatCard label="Total Tokens" value={data.totalTokens} />
            <StatCard label="Sessions" value={data.totalSessions} />
            <StatCard label="Primary Model" value="Griffith" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {data.modelDistribution && data.modelDistribution.length > 0 && (
              <div className="glass p-8 rounded-2xl">
                <h3 className="text-lg font-semibold mb-2">Model Distribution</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Shows the percentage breakdown of sessions across your AI models. Each model has different capabilities and pricing tiers. Griffith is your lightweight, fast model for simple tasks. Femto is your general-purpose model for most work. Godhand is your premium model for complex reasoning.
                </p>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={data.modelDistribution} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                      {data.modelDistribution.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {data.costTrendData && data.costTrendData.length > 0 && (
              <div className="glass p-8 rounded-2xl">
                <h3 className="text-lg font-semibold mb-2">Cost Trend (Last 30 Days)</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Daily cost breakdown showing how your spending has changed over the past month. Spikes indicate days with higher token usage or more expensive model calls. Use this to identify usage patterns and plan your budget accordingly.
                </p>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={data.costTrendData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                    <XAxis stroke="rgba(255,255,255,0.3)" dataKey="date" />
                    <YAxis stroke="rgba(255,255,255,0.3)" />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }} />
                    <Line type="monotone" dataKey="cost" stroke="#404040" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {data.recentSessions && data.recentSessions.length > 0 && (
            <div className="glass p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Recent Sessions</h3>
                  <p className="text-gray-400 text-sm">
                    Your last 10 AI sessions showing when they occurred, which model was used, token count, and cost. Each row represents one complete interaction with your selected model. Click "View More" to see your entire session history.
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
                  {data.recentSessions.slice(0, 10).map((row, i) => (
                    <tr key={i} className="border-b border-gray-900/30 hover:bg-gray-900/20 transition">
                      <td className="py-3 px-4">{row.date}</td>
                      <td className="py-3 px-4">{row.model}</td>
                      <td className="py-3 px-4">{row.tokens.toLocaleString()}</td>
                      <td className="py-3 px-4">{symbol}{convert(parseFloat(row.cost))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button 
                onClick={() => setShowModal(true)} 
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 rounded-lg transition font-medium"
              >
                View More ({data.recentSessions.length} total)
              </button>
            </div>
          )}
        </div>
      </main>

      <SessionModal sessions={data.recentSessions} isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
