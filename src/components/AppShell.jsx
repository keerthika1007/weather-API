import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'
import { StatusBanner } from './StatusBanner'
import { useWeather } from '../context/WeatherContext'

export function AppShell() {
  const { error, isOnline, loadWeather, selectedCity } = useWeather()
  const location = useLocation()
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => setDismissed(false), [location.pathname, error])

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-scroll-area">
        <StatusBanner isOnline={isOnline} message={dismissed ? '' : error} onRetry={() => loadWeather(selectedCity, { force: true })} onDismiss={() => setDismissed(true)} />
        <Outlet />
      </main>
      <MobileNav />
    </div>
  )
}
