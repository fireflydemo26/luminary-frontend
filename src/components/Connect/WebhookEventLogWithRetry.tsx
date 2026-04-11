import { useState, useEffect } from 'react'
import { WebhookDelivery } from '@/types'
import { api } from '@/api/client'
import { RetryButton } from './RetryButton'

interface Props { webhookId: string }

export function WebhookEventLogWithRetry({ webhookId }: Props) {
  const [deliveries, setDeliveries] = useState<WebhookDelivery[]>([])

  useEffect(() => {
    api.get<WebhookDelivery[]>(`/connect/webhooks/${webhookId}/deliveries`)
      .then(setDeliveries)
  }, [webhookId])

  const updateDelivery = (updated: WebhookDelivery) =>
    setDeliveries((ds) => ds.map((d) => (d.id === updated.id ? updated : d)))

  return (
    <ul className="event-log__list">
      {deliveries.map((d) => (
        <li key={d.id} className={`event-log__item event-log__item--${d.status}`}>
          <time>{new Date(d.timestamp).toLocaleString()}</time>
          <span>{d.event}</span>
          <span>{d.status}</span>
          <RetryButton delivery={d} onRetried={updateDelivery} />
        </li>
      ))}
    </ul>
  )
}
