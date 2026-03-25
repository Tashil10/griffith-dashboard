import Head from 'next/head'
import Header from '@/components/Header'
import { useData } from '@/hooks/useData'
import { useCurrency } from '@/hooks/useCurrency'

export default function History() {
  const { data, loading } = useData()
  const { symbol, convert } = useCurrency()

  if (loading) {
    return (
      <>
        <Head><title>History - Griffith Dashboard</title></Head>
        <Header />
        <div className="h-screen flex items-center justify-center">
          <p className="text-gray-400">Loading data...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Head><title>History - Griffith Dashboard</title></Head>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-3">Session History</h2>
            <p className="text-gray-400 max-w-2xl mb-6">
              Complete log of all your AI sessions. Each row represents one discrete interaction with one of your models. This helps you:
            </p>
            <ul className="text-gray-400 text-sm space-y-2 ml-4">
              <li>• <strong>Track usage patterns</strong> — See when you use specific models and how often</li>
              <li>• <strong>Monitor costs</strong> — Identify expensive sessions and optimize where possible</li>
              <li>• <strong>Understand model behavior</strong> — Correlate token counts with task complexity</li>
              <li>• <strong>Plan budgets</strong> — Use historical data to forecast monthly spending</li>
            </ul>
          </div>

          {data?.recentSessions && data.recentSessions.length > 0 && (
            <div className="glass p-8 rounded-2xl overflow-x-auto">
              <div className="mb-6">
                <p className="text-sm text-gray-400">
                  Showing <strong>{data.recentSessions.length}</strong> total sessions
                </p>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-900">
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Date & Time</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Model</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Tokens Used</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Cost</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Avg Cost/1K Tokens</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentSessions.map((row, i) => {
                    const costPer1k = row.tokens > 0 ? (parseFloat(row.cost) / (row.tokens / 1000)).toFixed(3) : '0'
                    return (
                      <tr key={i} className="border-b border-gray-900/30 hover:bg-gray-900/20 transition">
                        <td className="py-3 px-4 text-gray-300">{row.date}</td>
                        <td className="py-3 px-4 font-medium">{row.model}</td>
                        <td className="py-3 px-4">{row.tokens.toLocaleString()}</td>
                        <td className="py-3 px-4 font-semibold">{symbol}{convert(parseFloat(row.cost))}</td>
                        <td className="py-3 px-4 text-gray-400">{symbol}{costPer1k}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
