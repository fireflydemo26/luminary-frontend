import { Widget } from '@/types'

interface Props {
  widgets: Widget[]
  onWidgetMove?: (id: string, x: number, y: number) => void
  onWidgetRemove?: (id: string) => void
}

export function WidgetGrid({ widgets, onWidgetMove, onWidgetRemove }: Props) {
  if (widgets.length === 0) {
    return (
      <div className="widget-grid--empty">
        <p>No widgets yet. Add one to get started.</p>
      </div>
    )
  }

  return (
    <div className="widget-grid">
      {widgets.map((w) => (
        <div
          key={w.id}
          className="widget-grid__item"
          style={{ gridColumn: `span ${w.position.w}`, gridRow: `span ${w.position.h}` }}
        >
          <div className="widget-grid__header">
            <span>{w.title}</span>
            <button onClick={() => onWidgetRemove?.(w.id)} aria-label="Remove widget">×</button>
          </div>
          <div className="widget-grid__body" />
        </div>
      ))}
    </div>
  )
}
