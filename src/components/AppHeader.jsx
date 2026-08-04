import { Bell, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWeather } from '../context/WeatherContext'

export function AppHeader({ title, subtitle, showSearch = true }) {
  const { selectedCity } = useWeather()
  return (
    <header className="app-header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      <div className="header-actions">
        {showSearch && (
          <Link className="header-search" to="/search" aria-label="Search for a city">
            <Search size={18} aria-hidden="true" />
            <span>Search for a city….</span>
            <kbd>⌘ K</kbd>
          </Link>
        )}
      </div>
    </header>
  )
}
