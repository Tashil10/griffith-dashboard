import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const { pathname } = useRouter()
  const isActive = (p) => pathname === p
  
  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold">G</div>
            <h1 className="text-xl font-bold">Griffith</h1>
          </div>
          <nav className="flex gap-1">
            {[['/', 'Dashboard'], ['/models', 'Models'], ['/history', 'History']].map(([href, label]) => (
              <Link key={href} href={href} className={`px-4 py-2 rounded-lg transition ${isActive(href) ? 'glass bg-gray-800' : 'hover:bg-gray-900/30'}`}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
