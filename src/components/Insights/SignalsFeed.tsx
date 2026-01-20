import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'

interface Signal {
  id: string
  type: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  timestamp: string
}

export function SignalsFeed() {
  const { data } = useQuery({
    queryKey: ['signals'],
    queryFn: () => api.get<Signal[]>('/signals/feed'),
    refetchInterval: 30_000,
  })

  return (
    <ul className="signals-feed">
      {(data ?? []).map((s) => (
        <li key={s.id} className={`signals-feed__item signals-feed__item--${s.severity}`}>
          <time>{new Date(s.timestamp).toLocaleTimeString()}</time>
          <span>{s.message}</span>
        </li>
      ))}
    </ul>
  )
}
