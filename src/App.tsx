import { Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { DashboardPage } from '@/pages/DashboardPage'
import { ConnectPage } from '@/pages/ConnectPage'
import { OnboardingPage } from '@/pages/OnboardingPage'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/connect" element={<ConnectPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
    </AppShell>
  )
}
