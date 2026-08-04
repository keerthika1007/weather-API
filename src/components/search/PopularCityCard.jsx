import { ArrowUpRight, LoaderCircle, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchWeatherBundle, searchLocations } from '../../services/weatherApi'
import { formatTemperature, getCondition } from '../../utils/weather'
import { WeatherIcon } from '../ui/WeatherIcon'

export function PopularCityCard({ name, country, onSelect }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let mounted = true
    Promise.resolve(searchLocations(name)).then((locations) => locations[0] ? fetchWeatherBundle(locations[0]) : null).then((weather) => {
      if (mounted) setData(weather)
    }).catch(() => {}).finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [name])
  const condition = getCondition(data?.current?.weatherCode)
  return <Link className="popular-city-card" to={`/weather/${encodeURIComponent(name)}`} onClick={() => data?.city && onSelect?.(data.city)}><div className="popular-city-icon"><WeatherIcon condition={condition.condition} size={37} label={condition.label} /></div><div className="popular-city-copy"><span>{name}, {country}</span>{loading ? <LoaderCircle className="spin" size={18} /> : <><strong>{formatTemperature(data?.current?.temperature)}</strong><small>{condition.label}</small></>}</div><ArrowUpRight size={17} className="popular-city-arrow" aria-hidden="true" /></Link>
}
