import Head from 'next/head'
import Header from '@/components/Header'

export default function History() {
  return (
    <>
      <Head><title>History - Griffith Dashboard</title></Head>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-black via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-4xl font-bold mb-12">Session History</h2>
          <div className="glass p-8 rounded-2xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-4 text-gray-400">Date</th>
                  <th className="text-left py-4 px-4 text-gray-400">Model</th>
                  <th className="text-left py-4 px-4 text-gray-400">Tokens</th>
                  <th className="text-left py-4 px-4 text-gray-400">Cost</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['2026-03-25 12:05', 'Femto', '45K', '$8.20'],
                  ['2026-03-25 11:30', 'Griffith', '12K', '$1.20'],
                  ['2026-03-24 14:20', 'Godhand', '5K', '$0.62'],
                  ['2026-03-24 09:15', 'Femto', '38K', '$7.50'],
                  ['2026-03-23 16:45', 'Griffith', '18K', '$1.80'],
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
