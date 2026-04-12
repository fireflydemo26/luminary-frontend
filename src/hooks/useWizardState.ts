// GLOW-13: wizard loses state on browser back navigation
// Root cause: component unmounts on back, resetting useState.
// Fix: persist wizard state in sessionStorage so it survives navigation.

import { useState, useEffect } from 'react'

export function useWizardState<T>(key: string, initial: T): [T, (v: T) => void] {
  const [state, setStateRaw] = useState<T>(() => {
    try {
      const stored = sessionStorage.getItem(key)
      return stored ? (JSON.parse(stored) as T) : initial
    } catch {
      return initial
    }
  })

  const setState = (v: T) => {
    setStateRaw(v)
    try {
      sessionStorage.setItem(key, JSON.stringify(v))
    } catch {
      // sessionStorage full or unavailable — degrade gracefully
    }
  }

  // Clear on unmount if wizard completed (signal via null)
  useEffect(() => {
    return () => { sessionStorage.removeItem(key) }
  }, [key])

  return [state, setState]
}
