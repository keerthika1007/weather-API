import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Moon,
  Sun,
  Wind,
} from 'lucide-react'
import { WiDaySunny } from 'react-icons/wi'

const icons = {
  clear: Sun,
  'partly-cloudy': CloudSun,
  cloudy: Cloud,
  rain: CloudRain,
  storm: CloudLightning,
  snow: CloudSnow,
  fog: CloudFog,
  drizzle: CloudDrizzle,
  wind: Wind,
  night: Moon,
}

const tone = {
  clear: 'text-sun-gold',
  'partly-cloudy': 'text-sun-gold',
  cloudy: 'text-sky-reflection',
  rain: 'text-sky-reflection',
  storm: 'text-blue-violet',
  snow: 'text-sky-reflection',
  fog: 'text-sky-reflection',
  drizzle: 'text-sky-reflection',
  wind: 'text-storm-teal',
  night: 'text-lavender-dark',
}

export function WeatherIcon({ condition = 'partly-cloudy', size = 32, className = '', label, animated = false }) {
  if (condition === 'clear' && size >= 48) {
    return <WiDaySunny aria-label={label} className={`${tone.clear} ${className}`} size={size} title={label} />
  }
  const Icon = icons[condition] ?? CloudSun
  return <Icon aria-label={label} className={`${tone[condition] ?? tone['partly-cloudy']} ${animated ? 'weather-icon-float' : ''} ${className}`} size={size} strokeWidth={1.8} title={label} />
}
