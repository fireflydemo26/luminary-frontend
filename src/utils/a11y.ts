/** Generate a stable, unique ID for aria relationships */
let counter = 0
export function useId(prefix = 'lmn') {
  return `${prefix}-${++counter}`
}

/** Trap focus within a container (modals, drawers, wizards) */
export function trapFocus(container: HTMLElement) {
  const focusable = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  const handler = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus() }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }
  container.addEventListener('keydown', handler)
  return () => container.removeEventListener('keydown', handler)
}
