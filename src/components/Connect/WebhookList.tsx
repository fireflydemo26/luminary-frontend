import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { WebhookConfig } from '@/types'

export function WebhookList() {
  const { data, isLoading } = useQuery({
    queryKey: ['webhooks'],
    queryFn: () => api.get<WebhookConfig[]>('/connect/webhooks'),
  })

  if (isLoading) return <p>Loading webhooks…</p>
  if (!data?.length) return <p>No webhooks configured.</p>

  return (
    <ul className="webhook-list">
      {data.map((wh) => (
        <li key={wh.id} className={`webhook-list__item ${wh.active ? 'active' : 'inactive'}`}>
          <span className="webhook-list__url">{wh.url}</span>
          <span className="webhook-list__status">{wh.active ? 'Active' : 'Inactive'}</span>
        </li>
      ))}
    </ul>
  )
}
