import { CloudRain, Droplets, Gauge, MapPin, Thermometer, Wind } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GlassCard } from '../ui/GlassCard'
import { WeatherIcon } from '../ui/WeatherIcon'
import { useWeather } from '../../context/WeatherContext'
import { formatTemperature, formatWind, getCondition } from '../../utils/weather'

export function CurrentWeatherCard({ compact = false }) {
  const { selectedCity, weather, preferences } = useWeather()
  const current = weather?.current
  if (!current) return null
  const condition = getCondition(current.weatherCode)
  return (
    <GlassCard className={`current-weather-card ${compact ? 'current-weather-card-compact' : ''}`} interactive>
      <div className="weather-card-topline">
        <div>
          <div className="location-line"><MapPin size={17} fill="currentColor" aria-hidden="true" /><span>{selectedCity.name}, {selectedCity.country}</span></div>
          <p className="muted-text">{selectedCity.admin1 || 'Local forecast'} · {new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(new Date())}</p>
        </div>
        <span className="weather-status-pill"><span className="live-dot" /> Live</span>
      </div>
      <div className="current-weather-main">
        <div className="temperature-stack">
          <span className="temperature-value">{formatTemperature(current.temperature, preferences.temperatureUnit)}</span>
          <h2>{condition.label}</h2>
          <p>Feels like {formatTemperature(current.feelsLike, preferences.temperatureUnit)}</p>
        </div>
        <div className="weather-art" aria-label={condition.label} role="img">
          <div className="sun-orb" />
          <div className="weather-cloud weather-cloud-large" />
          <div className="weather-cloud weather-cloud-small" />
          <div className="weather-art-glow" />
          <WeatherIcon condition={condition.condition} size={96} className="weather-art-icon" animated />
        </div>
      </div>
      <div className="weather-summary-grid">
        <div className="summary-stat"><Thermometer size={18} aria-hidden="true" /><span>{formatTemperature(Math.max(current.temperature + 4, current.temperature), preferences.temperatureUnit)} / {formatTemperature(Math.min(current.temperature - 4, current.temperature), preferences.temperatureUnit)}</span><small>Min / Max</small></div>
        <div className="summary-stat"><Droplets size={18} aria-hidden="true" /><span>{current.humidity ?? '—'}%</span><small>Humidity</small></div>
        <div className="summary-stat"><Wind size={18} aria-hidden="true" /><span>{formatWind(current.windSpeed, preferences.windUnit)}</span><small>Wind</small></div>
        <div className="summary-stat"><Gauge size={18} aria-hidden="true" /><span>{current.pressure ? Math.round(current.pressure) : '—'}</span><small>Pressure</small></div>
      </div>
    </GlassCard>
  )
}
