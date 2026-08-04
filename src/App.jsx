import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { WeatherProvider } from './context/WeatherContext'
import { ExplorePage } from './pages/ExplorePage'
import { HomePage } from './pages/HomePage'
import { SearchPage } from './pages/SearchPage'
import { SettingsPage } from './pages/SettingsPage'
import { WeatherDetailsPage } from './pages/WeatherDetailsPage'

function App() {
  return <BrowserRouter><WeatherProvider><Routes><Route element={<AppShell />}><Route index element={<HomePage />} /><Route path="search" element={<SearchPage />} /><Route path="explore" element={<ExplorePage />} /><Route path="settings" element={<SettingsPage />} /><Route path="weather/:city" element={<WeatherDetailsPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Route></Routes></WeatherProvider></BrowserRouter>
}

export default App
