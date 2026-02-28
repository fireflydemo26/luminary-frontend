// GLOW-8: touch device support for widget drag-and-drop
// Carryover: Sprint 10 → 11 → 12 → 13. Last commit: Sprint 11.
// TODO: complete pointer event unification, test on iOS Safari

import { useRef } from 'react'

interface Props {
  widgetId: string
  onDragEnd: (id: string, dx: number, dy: number) => void
}

export function TouchDragHandle({ widgetId, onDragEnd }: Props) {
  const start = useRef<{ x: number; y: number } | null>(null)

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    start.current = { x: e.clientX, y: e.clientY }
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (start.current) {
      onDragEnd(widgetId, e.clientX - start.current.x, e.clientY - start.current.y)
      start.current = null
    }
  }

  return (
    <div
      className="drag-handle drag-handle--touch"
      role="button"
      aria-label="Drag to reposition widget"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      ⠿
    </div>
  )
}
