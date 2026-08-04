import { MapPin, Trash2, X } from 'lucide-react'
import { useWeather } from '../../context/WeatherContext'
import { formatTemperature } from '../../utils/weather'

export function RecentSearches({ onSelect }) {
  const { recentSearches, removeRecentSearch, clearRecentSearches, weather, preferences } = useWeather()
  return <section className="recent-searches"><div className="section-heading-row"><div><p className="eyebrow">Your trail</p><h2>Recent Searches</h2></div>{recentSearches.length > 0 && <button className="text-button" type="button" onClick={clearRecentSearches}><Trash2 size={15} /> Clear all</button>}</div><div className="chips-row">{recentSearches.length ? recentSearches.map((city) => <div className="search-chip" key={city.id}><button type="button" onClick={() => onSelect(city)}><MapPin size={15} /><span>{city.name}, {city.country}</span><strong>{city.id === weather?.city?.id ? formatTemperature(weather.current.temperature, preferences.temperatureUnit) : '—'}</strong></button><button type="button" className="chip-remove" aria-label={`Remove ${city.name} from recent searches`} onClick={() => removeRecentSearch(city.id)}><X size={14} /></button></div>) : <p className="muted-text">Your recent locations will appear here.</p>}</div></section>
}
