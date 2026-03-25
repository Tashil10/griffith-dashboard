import { useEffect, useState } from 'react'

export function useData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/data.json')
      .then(r => r.json())
      .then(d => {
        setData(d)
        setLoading(false)
      })
      .catch(e => {
        console.error('Failed to load data:', e)
        setLoading(false)
      })
  }, [])

  return { data, loading }
}
