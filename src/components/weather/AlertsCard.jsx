import { AlertTriangle, CloudLightning } from 'lucide-react'
import { GlassCard } from '../ui/GlassCard'
import { useWeather } from '../../context/WeatherContext'
import { getCondition } from '../../utils/weather'

export function AlertsCard() {
  const { weather } = useWeather()
  const condition = getCondition(weather?.current?.weatherCode)
  const isAlert = ['rain', 'storm', 'snow'].includes(condition.condition)
  return <GlassCard className={`alerts-card ${isAlert ? 'alerts-card-active' : ''}`}><div className="alert-title"><span className="card-icon-badge"><AlertTriangle size={17} /></span><div><p className="eyebrow">Weather watch</p><h2>{isAlert ? `${condition.label} expected` : 'No active weather alerts'}</h2></div></div><p>{isAlert ? 'Keep an eye on changing conditions and plan outdoor time around the latest forecast.' : 'Conditions look steady. Kevin will notify you if the forecast changes.'}</p>{isAlert && <div className="alert-detail"><CloudLightning size={18} /> Live conditions are being monitored</div>}</GlassCard>
}
