import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppHeader } from '../components/AppHeader'
import { AlertsCard } from '../components/weather/AlertsCard'
import { AirQualityCard } from '../components/weather/AirQualityCard'
import { HourlyForecast } from '../components/weather/HourlyForecast'
import { Recommendations } from '../components/weather/Recommendations'
import { SunTimes } from '../components/weather/SunTimes'
import { WeatherHero } from '../components/weather/WeatherHero'
import { WeeklyForecast } from '../components/weather/WeeklyForecast'
import { LoadingState } from '../components/ui/LoadingState'
import { useWeather } from '../context/WeatherContext'

export function WeatherDetailsPage() {
  const { city } = useParams()
  const { selectedCity, searchAndSelect, weather, loading } = useWeather()
  useEffect(() => {
    if (city && decodeURIComponent(city).toLowerCase() !== selectedCity.name.toLowerCase()) void searchAndSelect(decodeURIComponent(city)).catch(() => {})
  }, [city])
  if (loading && !weather) return <div className="page-container"><LoadingState label="Kevin is opening your full forecast…" /></div>
  return <div className="page-container"><AppHeader title={`${selectedCity.name}, ${selectedCity.country}`} subtitle="Your complete live weather picture" showSearch={false} /><div className="page-content details-content"><WeatherHero /><div className="details-forecast-grid"><HourlyForecast limit={12} title="24-Hour Forecast" /><WeeklyForecast /></div><div className="details-insight-grid"><AirQualityCard /><AlertsCard /><SunTimes /><Recommendations /></div><MetricGrid /></div></div>
}
