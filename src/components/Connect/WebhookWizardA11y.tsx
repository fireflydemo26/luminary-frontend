// GLOW-7: accessibility remediation for Connect v2 setup wizard
// Audit findings: missing live region, focus not trapped, step not announced to SR

import { useState, useEffect, useRef } from 'react'
import { trapFocus } from '@/utils/a11y'
import { WebhookConfig } from '@/types'

type Step = 1 | 2 | 3

interface Props { onComplete: (config: Omit<WebhookConfig, 'id' | 'createdAt'>) => void }

export function WebhookWizardA11y({ onComplete }: Props) {
  const [step, setStep] = useState<Step>(1)
  const [url, setUrl] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const announcerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) return trapFocus(containerRef.current)
  }, [])

  useEffect(() => {
    if (announcerRef.current) {
      announcerRef.current.textContent = `Step ${step} of 3`
    }
  }, [step])

  return (
    <div ref={containerRef} className="wizard" role="dialog" aria-modal="true" aria-label="Create webhook">
      {/* Live region announces step changes to screen readers */}
      <div ref={announcerRef} aria-live="polite" aria-atomic="true" className="sr-only" />

      <nav aria-label="Wizard progress">
        <ol>
          {([1, 2, 3] as Step[]).map((s) => (
            <li key={s} aria-current={step === s ? 'step' : undefined}>
              Step {s}
            </li>
          ))}
        </ol>
      </nav>

      {step === 1 && (
        <div>
          <h2 id="step-heading">Endpoint URL</h2>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            aria-labelledby="step-heading"
            aria-required="true"
            autoFocus
          />
          <button onClick={() => setStep(2)} disabled={!url}>Next</button>
        </div>
      )}
      {/* steps 2 and 3 TBD */}
    </div>
  )
}
