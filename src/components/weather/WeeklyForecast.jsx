import { GlassCard } from '../ui/GlassCard'
import { WeatherIcon } from '../ui/WeatherIcon'
import { useWeather } from '../../context/WeatherContext'
import { formatDay, formatTemperature, getCondition } from '../../utils/weather'

export function WeeklyForecast({ limit = 7 }) {
  const { weather, preferences } = useWeather()
  const days = weather?.daily?.slice(0, limit) ?? []
  return (
    <GlassCard className="forecast-card weekly-forecast-card">
      <div className="card-heading-row"><div><p className="eyebrow eyebrow-dark">Plan ahead</p><h2>7-Day Forecast</h2></div><span className="forecast-range">High / Low</span></div>
      <div className="weekly-list">
        {days.map((day, index) => {
          const condition = getCondition(day.weatherCode)
          return <div className="weekly-row" key={day.date}>
            <span className="weekly-day">{index === 0 ? 'Today' : formatDay(day.date, weather.timezone, { weekday: 'short' })}</span>
            <WeatherIcon condition={condition.condition} size={23} label={condition.label} />
            <span className="weekly-condition">{condition.label}</span>
            <div className="weekly-range-track"><span style={{ left: `${Math.max(0, Math.min(65, index * 8))}%`, width: `${Math.max(22, Math.min(62, 46 - index * 2))}%` }} /></div>
            <strong>{formatTemperature(day.max, preferences.temperatureUnit)}</strong>
            <span className="weekly-low">{formatTemperature(day.min, preferences.temperatureUnit)}</span>
          </div>
        })}
      </div>
    </GlassCard>
  )
}
