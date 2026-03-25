import Head from 'next/head'
import Header from '@/components/Header'
import { useData } from '@/hooks/useData'
import { useCurrency } from '@/hooks/useCurrency'

export default function Models() {
  const { data, loading } = useData()
  const { symbol, convert } = useCurrency()

  const modelDetails = {
    Griffith: {
      full: 'Claude Haiku 4.5',
      desc: 'Fast, lightweight model perfect for quick tasks, summarization, and simple reasoning. Best for high-volume, low-complexity work.',
      features: ['Fastest response times', 'Lowest cost', 'Good for summaries & QA', '~4K token limit'],
      image: '/images/thumb_f8-griffith-sketch_256.jpg'
    },
    Femto: {
      full: 'Claude Sonnet 4.6',
      desc: 'Balanced model with strong reasoning and coding abilities. Your go-to for general-purpose AI tasks, code generation, and detailed analysis.',
      features: ['Best value/performance', 'Excellent at coding', 'Strong reasoning', 'Handles complex tasks'],
      image: '/images/thumb_dd-femto-winged_256.jpg'
    },
    Godhand: {
      full: 'Claude Opus 4.6',
      desc: 'Premium reasoning model for the most challenging tasks. Use for complex problem-solving, research, and nuanced analysis requiring deep thinking.',
      features: ['Highest reasoning capacity', 'Best quality output', 'Handles very long context', 'Premium pricing'],
      image: '/images/thumb_ea-godhand-cosmic_256.jpg'
    }
  }

  if (loading) {
    return (
      <>
        <Head><title>Models - Griffith Dashboard</title></Head>
        <Header />
        <div className="h-screen flex items-center justify-center">
          <p className="text-gray-400">Loading data...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Head><title>Models - Griffith Dashboard</title></Head>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-3">Model Comparison</h2>
            <p className="text-gray-400 max-w-2xl">
              Compare your three AI models side-by-side. Each model excels at different tasks and has different pricing. Understanding their strengths helps you choose the right tool for each job and optimize your costs. The data below shows your actual usage and spending across each model.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {data?.modelDistribution?.map((model) => {
              const details = modelDetails[model.name]
              return (
                <div key={model.name} className="glass p-6 rounded-2xl flex flex-col">
                  <div className="flex justify-center mb-6">
                    <img 
                      src={details?.image} 
                      alt={model.name}
                      className="w-48 h-48 rounded-lg object-cover shadow-lg border border-gray-900"
                    />
                  </div>

                  <div className="h-1 mb-6 bg-gradient-to-r from-gray-700 to-transparent" />
                  <h3 className="text-2xl font-bold mb-1">{model.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{details?.full}</p>
                  
                  <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                    {details?.desc}
                  </p>

                  <div className="space-y-2 mb-6 flex-1">
                    {details?.features.map((f, i) => (
                      <div key={i} className="text-sm text-gray-400 flex items-start gap-2">
                        <span className="text-gray-600 mt-1">•</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-900 pt-4 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sessions</span>
                      <span className="font-semibold">{model.count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Tokens</span>
                      <span className="font-semibold">{(model.tokens / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Cost</span>
                      <span className="font-semibold">{symbol}{convert(model.cost)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-900">
                      <span className="text-gray-400">Usage %</span>
                      <span className="font-semibold">{model.value}%</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}
