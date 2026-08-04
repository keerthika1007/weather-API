const conditionMap = {
  0: { label: 'Clear sky', condition: 'clear' },
  1: { label: 'Mainly clear', condition: 'clear' },
  2: { label: 'Partly cloudy', condition: 'partly-cloudy' },
  3: { label: 'Overcast', condition: 'cloudy' },
  45: { label: 'Foggy', condition: 'fog' },
  48: { label: 'Rime fog', condition: 'fog' },
  51: { label: 'Light drizzle', condition: 'rain' },
  53: { label: 'Drizzle', condition: 'rain' },
  55: { label: 'Heavy drizzle', condition: 'rain' },
  61: { label: 'Light rain', condition: 'rain' },
  63: { label: 'Rain', condition: 'rain' },
  65: { label: 'Heavy rain', condition: 'rain' },
  66: { label: 'Freezing rain', condition: 'rain' },
  67: { label: 'Heavy freezing rain', condition: 'rain' },
  71: { label: 'Light snow', condition: 'snow' },
  73: { label: 'Snow', condition: 'snow' },
  75: { label: 'Heavy snow', condition: 'snow' },
  77: { label: 'Snow grains', condition: 'snow' },
  80: { label: 'Rain showers', condition: 'rain' },
  81: { label: 'Heavy rain showers', condition: 'rain' },
  82: { label: 'Violent rain showers', condition: 'rain' },
  85: { label: 'Snow showers', condition: 'snow' },
  86: { label: 'Heavy snow showers', condition: 'snow' },
  95: { label: 'Thunderstorm', condition: 'storm' },
  96: { label: 'Thunderstorm with hail', condition: 'storm' },
  99: { label: 'Heavy thunderstorm with hail', condition: 'storm' },
}

export function getCondition(code = 0) {
  return conditionMap[code] ?? conditionMap[3]
}

export function formatTemperature(value, unit = 'celsius') {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return '—'
  const converted = unit === 'fahrenheit' ? (Number(value) * 9) / 5 + 32 : Number(value)
  return `${Math.round(converted)}°`
}

export function formatWind(value, unit = 'kmh') {
  if (value === null || value === undefined) return '—'
  const converted = unit === 'mph' ? Number(value) * 0.621371 : Number(value)
  return `${Math.round(converted)} ${unit === 'mph' ? 'mph' : 'km/h'}`
}

export function formatVisibility(value, unit = 'km') {
  if (value === null || value === undefined) return '—'
  const converted = unit === 'mi' ? Number(value) * 0.621371 : Number(value)
  return `${Math.round(converted * 10) / 10} ${unit}`
}

export function formatPressure(value, unit = 'hpa') {
  if (value === null || value === undefined) return '—'
  const converted = unit === 'inhg' ? Number(value) * 0.0295299833 : Number(value)
  return `${Math.round(converted)} ${unit}`
}

export function formatTime(value, timeZone) {
  if (!value) return '—'
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone,
  }).format(new Date(value))
}

export function formatDay(value, timeZone, options = {}) {
  if (!value) return '—'
  return new Intl.DateTimeFormat(undefined, {
    weekday: options.weekday ?? 'short',
    month: options.month ?? undefined,
    day: options.day ?? undefined,
    timeZone,
  }).format(new Date(value))
}

export function getGreeting(hour = new Date().getHours()) {
  if (hour < 5) return 'Good Night'
  if (hour < 12) return 'Good Morning'
  if (hour < 18) return 'Good Afternoon'
  if (hour < 22) return 'Good Evening'
  return 'Good Night'
}

export function getAqiStatus(value) {
  if (value === null || value === undefined) return { label: 'Unavailable', tone: 'muted' }
  if (value <= 50) return { label: 'Good', tone: 'good' }
  if (value <= 100) return { label: 'Moderate', tone: 'warning' }
  if (value <= 150) return { label: 'Sensitive', tone: 'warning' }
  return { label: 'Unhealthy', tone: 'danger' }
}

export function getWindDirection(degrees = 0) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return directions[Math.round(Number(degrees) / 45) % directions.length]
}

export function slugifyCity(city) {
  return encodeURIComponent(city?.name ?? city ?? '')
}
