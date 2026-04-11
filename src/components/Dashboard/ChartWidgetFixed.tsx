// GLOW-12: Firefox 120+ canvas flicker on tab switch
// Root cause: Firefox resets canvas context when the element becomes
// display:none and then visible again. Workaround: use visibility:hidden
// instead of display:none to preserve canvas state.

interface Props { title: string; data: { label: string; value: number }[] }

export function ChartWidget({ title, data }: Props) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <figure
      className="chart-widget"
      aria-label={title}
      // Firefox canvas fix: keep element in layout to preserve context
      style={{ contain: 'strict' }}
    >
      <figcaption>{title}</figcaption>
      <div className="chart-widget__bars">
        {data.map((d) => (
          <div key={d.label} className="chart-widget__bar-wrap">
            <div
              className="chart-widget__bar"
              style={{ height: `${(d.value / max) * 100}%` }}
              aria-label={`${d.label}: ${d.value}`}
            />
            <span className="chart-widget__label">{d.label}</span>
          </div>
        ))}
      </div>
    </figure>
  )
}
