import Head from 'next/head'
import Header from '@/components/Header'
import StatCard from '@/components/StatCard'
import { useData } from '@/hooks/useData'
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#3b82f6', '#06b6d4', '#a78bfa']

export default function Home() {
  const { data, loading } = useData()

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
      <main className="min-h-screen bg-gradient-to-b from-black via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-4xl font-bold mb-2">Dashboard</h2>
          <p className="text-gray-400 mb-12">Real-time model usage analytics</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard label="Total Cost" value={`$${data.totalCost}`} />
            <StatCard label="Total Tokens" value={data.totalTokens} />
            <StatCard label="Sessions" value={data.totalSessions} />
            <StatCard label="Primary Model" value="Griffith" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {data.modelDistribution && data.modelDistribution.length > 0 && (
              <div className="glass p-8 rounded-2xl">
                <h3 className="text-lg font-semibold mb-6">Model Distribution</h3>
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
                <h3 className="text-lg font-semibold mb-6">Cost Trend (USD)</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={data.costTrendData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                    <XAxis stroke="rgba(255,255,255,0.3)" dataKey="date" />
                    <YAxis stroke="rgba(255,255,255,0.3)" />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }} />
                    <Line type="monotone" dataKey="cost" stroke="#06b6d4" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {data.recentSessions && data.recentSessions.length > 0 && (
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-lg font-semibold mb-6">Recent Sessions</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400">Date</th>
                    <th className="text-left py-3 px-4 text-gray-400">Model</th>
                    <th className="text-left py-3 px-4 text-gray-400">Tokens</th>
                    <th className="text-left py-3 px-4 text-gray-400">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentSessions.slice(0, 10).map((row, i) => (
                    <tr key={i} className="border-b border-gray-700/30 hover:bg-gray-800/20">
                      <td className="py-3 px-4">{row.date}</td>
                      <td className="py-3 px-4">{row.model}</td>
                      <td className="py-3 px-4">{row.tokens.toLocaleString()}</td>
                      <td className="py-3 px-4">${row.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
