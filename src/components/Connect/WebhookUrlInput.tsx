// GLOW-11: redesigned webhook URL input with domain validation
// Discovered mid-sprint, added without ticket by Declan (PMM).
interface Props {
  value: string
  onChange: (value: string) => void
  error?: string
}

const HTTPS_RE = /^https:\/\/[a-z0-9-]+(\.[a-z0-9-]+)+/i

export function WebhookUrlInput({ value, onChange, error }: Props) {
  const invalid = value && !HTTPS_RE.test(value)
  return (
    <div className="webhook-url-input">
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://your-service.example.com/hooks/luminary"
        aria-invalid={!!invalid}
        aria-describedby={invalid ? 'url-error' : undefined}
      />
      {(invalid || error) && (
        <p id="url-error" className="field-error">{error ?? 'Must be a valid HTTPS URL'}</p>
      )}
    </div>
  )
}
