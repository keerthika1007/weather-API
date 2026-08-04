import { ChevronLeft, ChevronRight, Droplets } from 'lucide-react'
import { GlassCard } from '../ui/GlassCard'
import { WeatherIcon } from '../ui/WeatherIcon'
import { useWeather } from '../../context/WeatherContext'
import { formatTemperature, formatTime, getCondition } from '../../utils/weather'

export function HourlyForecast({ limit = 12, title = 'Hourly Forecast' }) {
  const { weather, preferences } = useWeather()
  const hours = weather?.hourly?.slice(0, limit) ?? []
  const scroll = (direction) => {
    const rail = document.querySelector('[data-hourly-rail]')
    rail?.scrollBy({ left: direction * 260, behavior: 'smooth' })
  }
  return (
    <GlassCard className="forecast-card hourly-forecast-card">
      <div className="card-heading-row">
        <div><p className="eyebrow eyebrow-dark">Next 24 hours</p><h2>{title}</h2></div>
        <div className="rail-controls">
          <button className="icon-button icon-button-soft" type="button" aria-label="Scroll hourly forecast backward" onClick={() => scroll(-1)}><ChevronLeft size={17} /></button>
          <button className="icon-button icon-button-soft" type="button" aria-label="Scroll hourly forecast forward" onClick={() => scroll(1)}><ChevronRight size={17} /></button>
        </div>
      </div>
      <div className="forecast-rail" data-hourly-rail tabIndex="0" aria-label="Hourly forecast scroll area">
        {hours.map((hour, index) => {
          const condition = getCondition(hour.weatherCode)
          return <div className={`hour-card ${index === 0 ? 'is-current' : ''}`} key={`${hour.time}-${index}`}>
            <span>{index === 0 ? 'Now' : formatTime(hour.time, weather.timezone)}</span>
            <WeatherIcon condition={condition.condition} size={29} label={condition.label} />
            <strong>{formatTemperature(hour.temperature, preferences.temperatureUnit)}</strong>
            <small><Droplets size={11} /> {hour.precipitationProbability ?? 0}%</small>
          </div>
        })}
      </div>
    </GlassCard>
  )
}
