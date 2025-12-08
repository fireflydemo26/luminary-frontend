import { useState } from 'react'
import { WebhookConfig } from '@/types'

type Step = 1 | 2 | 3

interface WizardState {
  url: string
  events: string[]
  secret: string
}

const AVAILABLE_EVENTS = [
  'deployment.created', 'deployment.succeeded', 'deployment.failed',
  'incident.opened', 'incident.resolved',
  'pipeline.started', 'pipeline.completed',
]

interface Props { onComplete: (config: Omit<WebhookConfig, 'id' | 'createdAt'>) => void }

export function WebhookWizard({ onComplete }: Props) {
  const [step, setStep] = useState<Step>(1)
  const [state, setState] = useState<WizardState>({ url: '', events: [], secret: '' })

  const update = (patch: Partial<WizardState>) => setState((s) => ({ ...s, ...patch }))

  const toggleEvent = (event: string) => {
    update({
      events: state.events.includes(event)
        ? state.events.filter((e) => e !== event)
        : [...state.events, event],
    })
  }

  if (step === 1) {
    return (
      <div className="wizard wizard--step-1">
        <h2>Step 1 of 3 — Endpoint URL</h2>
        <input
          type="url"
          value={state.url}
          onChange={(e) => update({ url: e.target.value })}
          placeholder="https://your-service.example.com/hooks/luminary"
          aria-label="Webhook endpoint URL"
        />
        <button onClick={() => setStep(2)} disabled={!state.url}>Next</button>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="wizard wizard--step-2">
        <h2>Step 2 of 3 — Select events</h2>
        {AVAILABLE_EVENTS.map((event) => (
          <label key={event}>
            <input
              type="checkbox"
              checked={state.events.includes(event)}
              onChange={() => toggleEvent(event)}
            />
            {event}
          </label>
        ))}
        <button onClick={() => setStep(1)}>Back</button>
        <button onClick={() => setStep(3)} disabled={!state.events.length}>Next</button>
      </div>
    )
  }

  return (
    <div className="wizard wizard--step-3">
      <h2>Step 3 of 3 — Review &amp; confirm</h2>
      <p><strong>URL:</strong> {state.url}</p>
      <p><strong>Events:</strong> {state.events.join(', ')}</p>
      <button onClick={() => setStep(2)}>Back</button>
      <button
        onClick={() => onComplete({ url: state.url, events: state.events, active: true })}
        disabled={!state.events.length}
      >
        Create webhook
      </button>
    </div>
  )
}
