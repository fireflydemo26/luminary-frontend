import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

interface Props { children: ReactNode }

export function AppShell({ children }: Props) {
  return (
    <div className="app-shell">
      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/connect">Connect</NavLink>
      </nav>
      <main>{children}</main>
    </div>
  )
}
