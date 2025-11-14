import { useRef } from 'react'

interface Props {
  widgetId: string
  onDragEnd: (id: string, dx: number, dy: number) => void
}

export function DragHandle({ widgetId, onDragEnd }: Props) {
  const start = useRef<{ x: number; y: number } | null>(null)

  const onMouseDown = (e: React.MouseEvent) => {
    start.current = { x: e.clientX, y: e.clientY }
    const onMouseUp = (up: MouseEvent) => {
      if (start.current) {
        onDragEnd(widgetId, up.clientX - start.current.x, up.clientY - start.current.y)
        start.current = null
      }
      window.removeEventListener('mouseup', onMouseUp)
    }
    window.addEventListener('mouseup', onMouseUp)
  }

  return (
    <div
      className="drag-handle"
      role="button"
      aria-label="Drag to reposition widget"
      tabIndex={0}
      onMouseDown={onMouseDown}
    >
      ⠿
    </div>
  )
}
