import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCurrency } from '@/hooks/useCurrency'

export default function Header() {
  const { pathname } = useRouter()
  const { currency, toggle } = useCurrency()
  const isActive = (p) => pathname === p
  
  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/griffith-eye.png" alt="Griffith" className="w-10 h-10 rounded-lg object-cover" />
            <h1 className="text-xl font-bold">Griffith</h1>
          </div>
          <div className="flex items-center gap-4">
            <nav className="flex gap-1">
              {[['/', 'Dashboard'], ['/models', 'Models'], ['/history', 'History']].map(([href, label]) => (
                <Link key={href} href={href} className={`px-4 py-2 rounded-lg transition ${isActive(href) ? 'glass bg-gray-900' : 'hover:bg-gray-900/30'}`}>
                  {label}
                </Link>
              ))}
            </nav>
            <button onClick={toggle} className="px-3 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition text-sm font-medium">
              {currency}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
