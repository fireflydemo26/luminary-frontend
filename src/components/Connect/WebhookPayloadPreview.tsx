import { useMemo } from 'react'

interface Props {
  eventType: string
  webhookUrl: string
}

const SAMPLE_PAYLOADS: Record<string, object> = {
  'deployment.created': {
    event: 'deployment.created',
    timestamp: '2026-04-14T09:00:00Z',
    deployment: { id: 'dep_abc123', service: 'api', environment: 'production', version: 'v2.6.0' },
  },
  'incident.opened': {
    event: 'incident.opened',
    timestamp: '2026-04-14T09:00:00Z',
    incident: { id: 'inc_xyz789', severity: 'p1', title: 'API latency spike', assignee: null },
  },
}

const DEFAULT_PAYLOAD = { event: '(select an event type)', timestamp: '2026-04-14T09:00:00Z' }

export function WebhookPayloadPreview({ eventType }: Props) {
  const payload = useMemo(
    () => SAMPLE_PAYLOADS[eventType] ?? DEFAULT_PAYLOAD,
    [eventType]
  )

  return (
    <div className="payload-preview">
      <h3>Sample payload</h3>
      <pre className="payload-preview__code">
        <code>{JSON.stringify(payload, null, 2)}</code>
      </pre>
      <p className="payload-preview__note">
        This is a representative sample. Actual payloads may include additional fields.
      </p>
    </div>
  )
}
