export interface Widget {
  id: string
  type: 'chart' | 'metric' | 'table' | 'heatmap'
  title: string
  config: Record<string, unknown>
  position: { x: number; y: number; w: number; h: number }
}

export interface WebhookConfig {
  id: string
  url: string
  events: string[]
  secret?: string
  active: boolean
  createdAt: string
}

export interface WebhookDelivery {
  id: string
  webhookId: string
  event: string
  status: 'success' | 'failed' | 'pending'
  statusCode?: number
  responseTime?: number
  timestamp: string
  payload: Record<string, unknown>
}
