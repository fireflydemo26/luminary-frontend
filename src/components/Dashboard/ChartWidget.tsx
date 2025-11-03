interface Props { title: string; data: { label: string; value: number }[] }

export function ChartWidget({ title, data }: Props) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <figure className="chart-widget" aria-label={title}>
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
