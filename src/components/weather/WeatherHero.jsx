import { Heart, MapPin } from 'lucide-react'
import { GlassCard } from '../ui/GlassCard'
import { WeatherIcon } from '../ui/WeatherIcon'
import { useWeather } from '../../context/WeatherContext'
import { formatTemperature, getCondition } from '../../utils/weather'

export function WeatherHero() {
  const { selectedCity, weather, preferences } = useWeather()
  const current = weather?.current
  const condition = getCondition(current?.weatherCode)
  return <GlassCard className="details-hero-card"><div className="details-hero-copy"><div className="location-line"><MapPin size={18} fill="currentColor" /><span>{selectedCity.name}, {selectedCity.country}</span><span className="live-dot" /></div><p className="muted-text">{new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date(current?.time ?? Date.now()))}</p><span className="condition-chip"><WeatherIcon condition={condition.condition} size={16} /> {condition.label}</span><div className="details-temp-line"><strong>{formatTemperature(current?.temperature, preferences.temperatureUnit)}</strong><span>{preferences.temperatureUnit === 'fahrenheit' ? 'F' : 'C'}</span></div><p className="hero-feels">Feels like {formatTemperature(current?.feelsLike, preferences.temperatureUnit)} · {current?.humidity ?? '—'}% humidity</p></div><div className="details-hero-art"><div className="details-orbit" /><WeatherIcon condition={condition.condition} size={132} label={condition.label} animated /></div><button className="favorite-button" type="button" aria-label="Add selected city to favorites"><Heart size={18} /></button></GlassCard>
}
