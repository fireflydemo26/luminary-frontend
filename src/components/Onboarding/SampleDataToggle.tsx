import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SampleDataStore {
  enabled: boolean
  toggle: () => void
}

export const useSampleData = create<SampleDataStore>()(
  persist(
    (set) => ({
      enabled: true,
      toggle: () => set((s) => ({ enabled: !s.enabled })),
    }),
    { name: 'luminary-sample-data' }
  )
)

export function SampleDataToggle() {
  const { enabled, toggle } = useSampleData()
  return (
    <div className="sample-data-toggle">
      <label htmlFor="sample-toggle">
        <span>Sample data mode</span>
        <span className="sample-data-toggle__hint">
          {enabled ? 'Showing sample data to help you explore' : 'Showing your live data'}
        </span>
      </label>
      <button
        id="sample-toggle"
        role="switch"
        aria-checked={enabled}
        onClick={toggle}
        className={`toggle-switch ${enabled ? 'on' : 'off'}`}
      >
        <span className="sr-only">{enabled ? 'Disable' : 'Enable'} sample data</span>
      </button>
    </div>
  )
}
