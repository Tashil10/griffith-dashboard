export default function StatCard({ label, value, unit = '' }) {
  return (
    <div className="glass p-6 rounded-2xl">
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold">{value}</span>
        {unit && <span className="text-gray-400">{unit}</span>}
      </div>
    </div>
  )
}
