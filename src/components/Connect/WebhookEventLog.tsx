import { useState, useEffect, useRef } from 'react'
import { WebhookDelivery } from '@/types'
import { api } from '@/api/client'

type Filter = 'all' | 'success' | 'failed'

interface Props { webhookId: string }

export function WebhookEventLog({ webhookId }: Props) {
  const [deliveries, setDeliveries] = useState<WebhookDelivery[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [loading, setLoading] = useState(true)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const data = await api.get<WebhookDelivery[]>(`/connect/webhooks/${webhookId}/deliveries`)
        setDeliveries(data)
      } finally {
        setLoading(false)
      }
    }
    fetchDeliveries()
    pollRef.current = setInterval(fetchDeliveries, 5_000)
    return () => { if (pollRef.current) clearInterval(pollRef.current) }
  }, [webhookId])

  const visible = deliveries.filter((d) => filter === 'all' || d.status === filter)

  return (
    <div className="event-log">
      <div className="event-log__filters" role="group" aria-label="Filter deliveries">
        {(['all', 'success', 'failed'] as Filter[]).map((f) => (
          <button
            key={f}
            className={filter === f ? 'active' : ''}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
          >
            {f}
          </button>
        ))}
      </div>
      {loading && <p>Loading event log…</p>}
      <ul className="event-log__list">
        {visible.map((d) => (
          <li key={d.id} className={`event-log__item event-log__item--${d.status}`}>
            <time dateTime={d.timestamp}>{new Date(d.timestamp).toLocaleTimeString()}</time>
            <span className="event-log__event">{d.event}</span>
            <span className="event-log__status">{d.status}</span>
            {d.statusCode && <span className="event-log__code">{d.statusCode}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}
