// GLOW-10: webhook signature verification UI
// Added mid-Sprint 10 per verbal request from PMM — no estimation, no design review.
import { useState } from 'react'

export function WebhookSignatureInfo() {
  const [show, setShow] = useState(false)
  return (
    <div className="webhook-signature">
      <button onClick={() => setShow((s) => !s)}>
        {show ? 'Hide' : 'Show'} signing secret
      </button>
      {show && (
        <code className="webhook-signature__secret" aria-live="polite">
          Use HMAC-SHA256 with your signing secret to verify payloads.
        </code>
      )}
    </div>
  )
}
