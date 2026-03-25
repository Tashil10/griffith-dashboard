import { useEffect, useState } from 'react'

const USD_TO_ZAR = 19

export function useCurrency() {
  const [currency, setCurrency] = useState('ZAR')

  useEffect(() => {
    const saved = localStorage?.getItem('griffith-currency') || 'ZAR'
    setCurrency(saved)
  }, [])

  const toggle = () => {
    const next = currency === 'USD' ? 'ZAR' : 'USD'
    setCurrency(next)
    if (typeof window !== 'undefined') {
      localStorage?.setItem('griffith-currency', next)
    }
  }

  const convert = (usd) => {
    if (currency === 'ZAR') return (usd * USD_TO_ZAR).toFixed(2)
    return usd.toFixed(2)
  }

  const symbol = currency === 'ZAR' ? 'R' : '$'

  return { currency, toggle, convert, symbol }
}
