import { useState } from 'react'
import { WebhookUrlInput } from './WebhookUrlInput'
import { WebhookPayloadPreview } from './WebhookPayloadPreview'
import { WebhookConfig } from '@/types'

type Step = 1 | 2 | 3

interface State { url: string; events: string[]; secret: string }

const EVENTS = [
  'deployment.created', 'deployment.succeeded', 'deployment.failed',
  'incident.opened', 'incident.resolved',
  'pipeline.started', 'pipeline.completed',
]

interface Props { onComplete: (config: Omit<WebhookConfig, 'id' | 'createdAt'>) => void }

export function WebhookWizardV2({ onComplete }: Props) {
  const [step, setStep] = useState<Step>(1)
  const [state, setState] = useState<State>({ url: '', events: [], secret: '' })
  const update = (p: Partial<State>) => setState((s) => ({ ...s, ...p }))
  const toggle = (e: string) =>
    update({ events: state.events.includes(e) ? state.events.filter((x) => x !== e) : [...state.events, e] })

  if (step === 1) return (
    <div className="wizard wizard--step-1">
      <h2>Step 1 of 3 — Endpoint URL</h2>
      <WebhookUrlInput value={state.url} onChange={(url) => update({ url })} />
      <button onClick={() => setStep(2)} disabled={!state.url}>Next</button>
    </div>
  )

  if (step === 2) return (
    <div className="wizard wizard--step-2">
      <h2>Step 2 of 3 — Select events</h2>
      {EVENTS.map((e) => (
        <label key={e}><input type="checkbox" checked={state.events.includes(e)} onChange={() => toggle(e)} />{e}</label>
      ))}
      <button onClick={() => setStep(1)}>Back</button>
      <button onClick={() => setStep(3)} disabled={!state.events.length}>Next</button>
    </div>
  )

  return (
    <div className="wizard wizard--step-3">
      <h2>Step 3 of 3 — Review &amp; payload preview</h2>
      <p><strong>URL:</strong> {state.url}</p>
      <WebhookPayloadPreview eventType={state.events[0] ?? ''} webhookUrl={state.url} />
      <button onClick={() => setStep(2)}>Back</button>
      <button onClick={() => onComplete({ url: state.url, events: state.events, active: true })}>
        Create webhook
      </button>
    </div>
  )
}
