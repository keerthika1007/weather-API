import { Sunrise, Sunset } from 'lucide-react'
import { GlassCard } from '../ui/GlassCard'
import { useWeather } from '../../context/WeatherContext'
import { formatTime } from '../../utils/weather'

export function SunTimes() {
  const { weather } = useWeather()
  return <GlassCard className="sun-times-card"><div className="card-heading-row"><div><p className="eyebrow eyebrow-dark">Daylight</p><h2>Sunrise & Sunset</h2></div></div><div className="sun-times-grid"><div><Sunrise size={24} className="text-sun-gold" /><span>Sunrise</span><strong>{formatTime(weather?.sunrise, weather?.timezone)}</strong></div><div><Sunset size={24} className="text-sky-reflection" /><span>Sunset</span><strong>{formatTime(weather?.sunset, weather?.timezone)}</strong></div></div></GlassCard>
}
