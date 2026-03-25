import { useCurrency } from '@/hooks/useCurrency'

export default function SessionModal({ sessions, isOpen, onClose }) {
  const { symbol, convert } = useCurrency()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-900">
          <h2 className="text-2xl font-bold">All Sessions ({sessions.length})</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">×</button>
        </div>
        <div className="overflow-y-auto flex-1 p-6">
          <table className="w-full text-sm">
            <thead className="sticky top-0">
              <tr className="border-b border-gray-900">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Model</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Tokens</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Cost</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((row, i) => (
                <tr key={i} className="border-b border-gray-900/30 hover:bg-gray-900/20 transition">
                  <td className="py-3 px-4">{row.date}</td>
                  <td className="py-3 px-4">{row.model}</td>
                  <td className="py-3 px-4">{row.tokens.toLocaleString()}</td>
                  <td className="py-3 px-4">{symbol}{convert(parseFloat(row.cost))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
