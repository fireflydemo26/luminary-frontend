import { useState } from 'react'
import { api } from '@/api/client'
import { WebhookDelivery } from '@/types'

interface Props {
  delivery: WebhookDelivery
  onRetried: (updated: WebhookDelivery) => void
}

export function RetryButton({ delivery, onRetried }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (delivery.status !== 'failed') return null

  const handleRetry = async () => {
    setLoading(true)
    setError(null)
    try {
      const updated = await api.post<WebhookDelivery>(
        `/connect/webhooks/${delivery.webhookId}/deliveries/${delivery.id}/retry`,
        {}
      )
      onRetried(updated)
    } catch (e) {
      setError('Retry failed — check endpoint availability')
    } finally {
      setLoading(false)
    }
  }

  return (
    <span>
      <button onClick={handleRetry} disabled={loading} aria-busy={loading}>
        {loading ? 'Retrying…' : 'Retry'}
      </button>
      {error && <span className="retry-error" role="alert">{error}</span>}
    </span>
  )
}
