import { LocateFixed, MapPin } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppHeader } from '../components/AppHeader'
import { GlassCard } from '../components/ui/GlassCard'
import { SearchCombobox } from '../components/search/SearchCombobox'
import { RecentSearches } from '../components/search/RecentSearches'
import { PopularCityCard } from '../components/search/PopularCityCard'
import { useWeather } from '../context/WeatherContext'

const popularCities = [['London', 'United Kingdom'], ['New York', 'United States'], ['Tokyo', 'Japan'], ['Paris', 'France'], ['Dubai', 'United Arab Emirates'], ['Sydney', 'Australia'], ['Toronto', 'Canada'], ['Singapore', 'Singapore'], ['Mumbai', 'India'], ['Bengaluru', 'India']]

export function SearchPage() {
  const { searchAndSelect, selectCity, selectCurrentLocation } = useWeather()
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState('')
  const select = async (city) => { await selectCity(city); navigate(`/weather/${encodeURIComponent(city.name)}`) }
  const submit = async (query) => { try { const city = await searchAndSelect(query); navigate(`/weather/${encodeURIComponent(city.name)}`) } catch (error) { setFeedback(error instanceof Error ? error.message : 'No weather location found.') } }
  const useLocation = async () => { try { const city = await selectCurrentLocation(); navigate(`/weather/${encodeURIComponent(city.name)}`) } catch (error) { setFeedback(error instanceof Error ? error.message : 'Location access was not available.') } }
  return <div className="page-container"><AppHeader title="Search for a location" subtitle="Find weather updates for any city in the world." /><div className="page-content search-content"><GlassCard className="search-panel"><SearchCombobox onSelect={select} onSubmit={submit} /></GlassCard>{feedback && <div className="inline-feedback" role="alert"><MapPin size={16} /> {feedback}</div>}<RecentSearches onSelect={select} /><section className="popular-section"><div className="section-heading-row"><div><p className="eyebrow">Explore the world</p><h2>Popular Cities</h2></div><span className="muted-text">Live conditions</span></div><div className="popular-city-grid">{popularCities.map(([name, country]) => <PopularCityCard key={name} name={name} country={country} onSelect={select} />)}</div></section><GlassCard className="location-help-banner"><div className="location-help-icon"><LocateFixed size={30} /></div><div><p className="eyebrow">Can’t find your city?</p><h2>Use your current location</h2><p>Let your browser find the nearest forecast and local air quality readings.</p></div><button className="button button-outline-light" type="button" onClick={useLocation}><LocateFixed size={17} /> Use Current Location</button></GlassCard></div></div>
}
