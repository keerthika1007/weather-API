import { HeartPulse, Plane, Shirt } from 'lucide-react'
import { GlassCard } from '../ui/GlassCard'
import { useWeather } from '../../context/WeatherContext'
import { getCondition } from '../../utils/weather'

export function Recommendations() {
  const { weather } = useWeather()
  const condition = getCondition(weather?.current?.weatherCode)
  const rainy = ['rain', 'storm', 'snow'].includes(condition.condition)
  return <GlassCard className="recommendations-card"><div className="card-heading-row"><div><p className="eyebrow eyebrow-dark">Personalized for you</p><h2>Kevin’s recommendations</h2></div></div><div className="recommendation-list"><div className="recommendation-item recommendation-clothing"><Shirt size={20} /><div><strong>Clothing</strong><span>{rainy ? 'Carry a light waterproof layer and comfortable shoes.' : 'Breathable layers should feel comfortable throughout the day.'}</span></div></div><div className="recommendation-item recommendation-travel"><Plane size={20} /><div><strong>Travel</strong><span>{weather?.current?.visibility < 4 ? 'Allow extra travel time for reduced visibility.' : 'Travel conditions look comfortable for the next few hours.'}</span></div></div><div className="recommendation-item recommendation-health"><HeartPulse size={20} /><div><strong>Health</strong><span>{weather?.current?.uvIndex > 5 ? 'Use sunscreen and seek shade around midday.' : 'Outdoor activity looks comfortable with normal hydration.'}</span></div></div></div></GlassCard>
}
