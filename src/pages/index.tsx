import Head from 'next/head'
import Header from '@/components/Header'
import StatCard from '@/components/StatCard'
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const modelData = [
  { name: 'Griffith', value: 25 },
  { name: 'Femto', value: 68 },
  { name: 'Godhand', value: 7 }
]

const costData = [
  { date: 'Mar 18', cost: 12.5 },
  { date: 'Mar 19', cost: 15.3 },
  { date: 'Mar 20', cost: 18.7 },
  { date: 'Mar 21', cost: 22.1 },
  { date: 'Mar 22', cost: 24.8 },
  { date: 'Mar 23', cost: 28.5 },
  { date: 'Mar 24', cost: 31.2 },
  { date: 'Mar 25', cost: 35.6 },
]

const COLORS = ['#3b82f6', '#06b6d4', '#a78bfa']

export default function Home() {
  return (
    <>
      <Head><title>Griffith Dashboard</title></Head>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-black via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-4xl font-bold mb-2">Dashboard</h2>
          <p className="text-gray-400 mb-12">Model usage and cost analytics</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard label="Total Cost" value="$187.50" />
            <StatCard label="Total Tokens" value="1.2M" />
            <StatCard label="Sessions" value="312" />
            <StatCard label="Favorite Model" value="Femto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-lg font-semibold mb-6">Model Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={modelData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                    {modelData.map((e, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="glass p-8 rounded-2xl">
              <h3 className="text-lg font-semibold mb-6">Cost Trend (USD)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={costData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                  <XAxis stroke="rgba(255,255,255,0.3)" dataKey="date" />
                  <YAxis stroke="rgba(255,255,255,0.3)" />
                  <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <Line type="monotone" dataKey="cost" stroke="#06b6d4" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

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
                {[
                  ['2026-03-25', 'Femto', '45K', '$8.20'],
                  ['2026-03-24', 'Griffith', '12K', '$1.20'],
                  ['2026-03-23', 'Godhand', '5K', '$0.62'],
                ].map((r, i) => (
                  <tr key={i} className="border-b border-gray-700/30 hover:bg-gray-800/20">
                    <td className="py-3 px-4">{r[0]}</td>
                    <td className="py-3 px-4">{r[1]}</td>
                    <td className="py-3 px-4">{r[2]}</td>
                    <td className="py-3 px-4">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}
