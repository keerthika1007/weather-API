import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { fetchWeatherBundle, getDefaultCity, searchLocations } from '../services/weatherApi'
import { readStorage, writeStorage } from '../utils/storage'
import { useOnlineStatus } from '../hooks/useOnlineStatus'

const CACHE_TTL = 10 * 60 * 1000
const WeatherContext = createContext(null)

const defaultPreferences = {
  language: 'English',
  locationAccess: true,
  autoRefresh: true,
}

export function WeatherProvider({ children }) {
  const isOnline = useOnlineStatus()
  const cacheRef = useRef(readStorage('kevin-weather-cache', {}))
  const initialCity = readStorage('kevin-weather-city', getDefaultCity())
  const [selectedCity, setSelectedCity] = useState(initialCity)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [preferences, setPreferences] = useState(() => ({ ...defaultPreferences, ...readStorage('kevin-weather-preferences', {}) }))
  const [recentSearches, setRecentSearches] = useState(() => readStorage('kevin-weather-recent', [getDefaultCity()]))
  const [lastUpdated, setLastUpdated] = useState(null)

  const cacheKey = useCallback((city) => `${city.latitude.toFixed(3)}:${city.longitude.toFixed(3)}`, [])

  const loadWeather = useCallback(async (city, { force = false } = {}) => {
    const key = cacheKey(city)
    const cached = cacheRef.current[key]
    if (!force && cached && Date.now() - cached.savedAt < CACHE_TTL) {
      setWeather(cached.weather)
      setLastUpdated(cached.savedAt)
      setLoading(false)
      return cached.weather
    }
    setLoading(true)
    setError('')
    try {
      const nextWeather = await fetchWeatherBundle(city)
      cacheRef.current[key] = { savedAt: Date.now(), weather: nextWeather }
      writeStorage('kevin-weather-cache', cacheRef.current)
      setWeather(nextWeather)
      setLastUpdated(Date.now())
      if (nextWeather.error && isOnline) setError('Live weather is temporarily unavailable. Showing the latest available snapshot.')
      return nextWeather
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load weather data.')
      if (cached) setWeather(cached.weather)
      return cached?.weather ?? null
    } finally {
      setLoading(false)
    }
  }, [cacheKey, isOnline])

  const selectCity = useCallback(async (city) => {
    if (!city?.latitude || !city?.longitude) return null
    setSelectedCity(city)
    writeStorage('kevin-weather-city', city)
    setRecentSearches((current) => {
      const next = [city, ...current.filter((item) => item.id !== city.id)].slice(0, 6)
      writeStorage('kevin-weather-recent', next)
      return next
    })
    return loadWeather(city)
  }, [loadWeather])

  const searchAndSelect = useCallback(async (query) => {
    const locations = await searchLocations(query)
    if (!locations.length) throw new Error(`No weather location found for “${query}”.`)
    await selectCity(locations[0])
    return locations[0]
  }, [selectCity])

  const selectCurrentLocation = useCallback(() => new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Location access is not available in this browser.'))
      return
    }
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      try {
        const nearby = await searchLocations(`${coords.latitude.toFixed(2)}, ${coords.longitude.toFixed(2)}`)
        const city = nearby[0] ?? { ...selectedCity, latitude: coords.latitude, longitude: coords.longitude }
        await selectCity(city)
        resolve(city)
      } catch (requestError) {
        reject(requestError)
      }
    }, () => reject(new Error('Location permission was denied.')), { enableHighAccuracy: true, timeout: 10000 })
  }), [selectedCity, selectCity])

  const updatePreference = useCallback((key, value) => {
    setPreferences((current) => {
      const next = { ...current, [key]: value }
      writeStorage('kevin-weather-preferences', next)
      return next
    })
  }, [])

  const removeRecentSearch = useCallback((id) => {
    setRecentSearches((current) => {
      const next = current.filter((item) => item.id !== id)
      writeStorage('kevin-weather-recent', next)
      return next
    })
  }, [])

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([])
    writeStorage('kevin-weather-recent', [])
  }, [])

  useEffect(() => {
    void loadWeather(selectedCity)
  }, [])

  useEffect(() => {
    if (!preferences.autoRefresh) return undefined
    const interval = window.setInterval(() => void loadWeather(selectedCity, { force: true }), 15 * 60 * 1000)
    return () => window.clearInterval(interval)
  }, [loadWeather, preferences.autoRefresh, selectedCity])

  useEffect(() => {
    document.documentElement.dataset.theme = preferences.theme
  }, [preferences.theme])

  const value = useMemo(() => ({
    selectedCity,
    weather,
    loading,
    error,
    isOnline,
    lastUpdated,
    preferences,
    recentSearches,
    selectCity,
    searchAndSelect,
    selectCurrentLocation,
    loadWeather,
    updatePreference,
    removeRecentSearch,
    clearRecentSearches,
  }), [clearRecentSearches, error, isOnline, lastUpdated, loadWeather, loading, preferences, recentSearches, removeRecentSearch, searchAndSelect, selectCity, selectCurrentLocation, selectedCity, updatePreference, weather])

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
}

export function useWeather() {
  const context = useContext(WeatherContext)
  if (!context) throw new Error('useWeather must be used within WeatherProvider')
  return context
}
