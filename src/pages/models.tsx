import Head from 'next/head'
import Header from '@/components/Header'

export default function Models() {
  return (
    <>
      <Head><title>Models - Griffith Dashboard</title></Head>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-black via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-4xl font-bold mb-12">Model Comparison</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { name: 'Griffith', model: 'Claude Haiku 4.5', uses: 150, tokens: '200K', cost: '$12.50', color: 'from-blue-500' },
              { name: 'Femto', model: 'Claude Sonnet 4.6', uses: 350, tokens: '600K', cost: '$150', color: 'from-cyan-500' },
              { name: 'Godhand', model: 'Claude Opus 4.6', uses: 50, tokens: '100K', cost: '$27.50', color: 'from-purple-500' },
            ].map(m => (
              <div key={m.name} className="glass p-6 rounded-2xl">
                <div className={`h-1 mb-6 bg-gradient-to-r ${m.color} to-transparent`} />
                <h3 className="text-2xl font-bold">{m.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{m.model}</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-gray-400">Uses</span><span>{m.uses}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Tokens</span><span>{m.tokens}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Cost</span><span>{m.cost}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
