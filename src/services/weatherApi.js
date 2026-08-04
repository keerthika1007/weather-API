import axios from 'axios'
import { getCondition } from '../utils/weather'

const api = axios.create({
  timeout: 12000,
  headers: { Accept: 'application/json' },
})

const DEFAULT_CITY = {
  id: 'hyderabad-in',
  name: 'Hyderabad',
  country: 'India',
  admin1: 'Telangana',
  latitude: 17.385,
  longitude: 78.4867,
  timezone: 'Asia/Kolkata',
}

export async function searchLocations(query) {
  const value = query.trim()
  if (!value) return []
  const response = await api.get('https://geocoding-api.open-meteo.com/v1/search', {
    params: { name: value, count: 8, language: 'en', format: 'json' },
  })
  return (response.data?.results ?? []).map((location) => ({
    id: String(location.id),
    name: location.name,
    country: location.country ?? '',
    countryCode: location.country_code ?? '',
    admin1: location.admin1 ?? '',
    latitude: location.latitude,
    longitude: location.longitude,
    timezone: location.timezone ?? 'auto',
  }))
}

function createFallbackWeather(city = DEFAULT_CITY) {
  const hourly = Array.from({ length: 24 }, (_, index) => ({
    time: new Date(Date.now() + index * 3600000).toISOString(),
    temperature: 28 + Math.round(Math.sin(index / 3) * 3),
    humidity: 60 - Math.round(index / 3),
    precipitationProbability: Math.max(10, 60 - index * 2),
    weatherCode: index > 4 && index < 8 ? 2 : 1,
    windSpeed: 12,
    uvIndex: 4,
    visibility: 10,
  }))
  const daily = Array.from({ length: 7 }, (_, index) => ({
    date: new Date(Date.now() + index * 86400000).toISOString(),
    weatherCode: [61, 0, 2, 95, 2, 1, 3][index],
    max: 32 + (index % 2),
    min: 24 + (index % 2),
    precipitationProbability: [60, 20, 30, 70, 20, 10, 15][index],
    uvIndex: 4,
    windSpeed: 12,
  }))
  return {
    city,
    timezone: city.timezone,
    current: {
      time: new Date().toISOString(),
      temperature: 28,
      feelsLike: 31,
      humidity: 60,
      precipitation: 0,
      rain: 0,
      weatherCode: 2,
      cloudCover: 42,
      pressure: 1012,
      windSpeed: 12,
      windDirection: 225,
      visibility: 10,
      uvIndex: 4,
      isDay: 1,
    },
    hourly,
    daily,
    sunrise: new Date(Date.now() + 2 * 3600000).toISOString(),
    sunset: new Date(Date.now() + 10 * 3600000).toISOString(),
    airQuality: { aqi: 45, pm25: 12, pm10: 23, co: 210, no2: 13, so2: 4, ozone: 68 },
    fetchedAt: Date.now(),
    isFallback: true,
  }
}

function normalizeForecast(forecast, airQuality, city) {
  const current = forecast.current ?? {}
  const hourly = (forecast.hourly?.time ?? []).map((time, index) => ({
    time,
    temperature: forecast.hourly.temperature_2m?.[index],
    humidity: forecast.hourly.relative_humidity_2m?.[index],
    precipitationProbability: forecast.hourly.precipitation_probability?.[index],
    weatherCode: forecast.hourly.weather_code?.[index],
    windSpeed: forecast.hourly.wind_speed_10m?.[index],
    uvIndex: forecast.hourly.uv_index?.[index],
    visibility: forecast.hourly.visibility?.[index] ? forecast.hourly.visibility[index] / 1000 : null,
  }))
  const daily = (forecast.daily?.time ?? []).map((date, index) => ({
    date,
    weatherCode: forecast.daily.weather_code?.[index],
    max: forecast.daily.temperature_2m_max?.[index],
    min: forecast.daily.temperature_2m_min?.[index],
    precipitationProbability: forecast.daily.precipitation_probability_max?.[index],
    uvIndex: forecast.daily.uv_index_max?.[index],
    windSpeed: forecast.daily.wind_speed_10m_max?.[index],
  }))
  const airCurrent = airQuality?.current ?? {}
  return {
    city,
    timezone: forecast.timezone,
    current: {
      time: current.time,
      temperature: current.temperature_2m,
      feelsLike: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      precipitation: current.precipitation,
      rain: current.rain,
      weatherCode: current.weather_code,
      cloudCover: current.cloud_cover,
      pressure: current.surface_pressure,
      windSpeed: current.wind_speed_10m,
      windDirection: current.wind_direction_10m,
      visibility: current.visibility ? current.visibility / 1000 : null,
      uvIndex: current.uv_index,
      isDay: current.is_day,
    },
    hourly,
    daily,
    sunrise: forecast.daily?.sunrise?.[0],
    sunset: forecast.daily?.sunset?.[0],
    airQuality: {
      aqi: airCurrent.us_aqi ?? airCurrent.european_aqi,
      pm25: airCurrent.pm2_5,
      pm10: airCurrent.pm10,
      co: airCurrent.carbon_monoxide,
      no2: airCurrent.nitrogen_dioxide,
      so2: airCurrent.sulphur_dioxide,
      ozone: airCurrent.ozone,
    },
    fetchedAt: Date.now(),
  }
}

export async function fetchWeatherBundle(city) {
  try {
    const [forecastResponse, airQualityResponse] = await Promise.all([
      api.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: city.latitude,
          longitude: city.longitude,
          timezone: 'auto',
          forecast_days: 7,
          current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m,visibility,uv_index,is_day',
          hourly: 'temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m,uv_index,visibility',
          daily: 'weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant',
        },
      }),
      api.get('https://air-quality-api.open-meteo.com/v1/air-quality', {
        params: {
          latitude: city.latitude,
          longitude: city.longitude,
          timezone: 'auto',
          forecast_days: 1,
          current: 'us_aqi,european_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone',
        },
      }),
    ])
    return normalizeForecast(forecastResponse.data, airQualityResponse.data, city)
  } catch (error) {
    const fallback = createFallbackWeather(city)
    fallback.error = error instanceof Error ? error.message : 'Weather service unavailable'
    return fallback
  }
}

export async function fetchCityWeather(cityName) {
  const locations = await searchLocations(cityName)
  if (!locations.length) throw new Error(`No weather location found for “${cityName}”.`)
  return { city: locations[0], weather: await fetchWeatherBundle(locations[0]) }
}

export function getDefaultCity() {
  return DEFAULT_CITY
}

export function getWeatherLabel(code) {
  return getCondition(code).label
}
