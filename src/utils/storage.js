const hasStorage = typeof window !== 'undefined' && 'localStorage' in window

export function readStorage(key, fallback) {
  if (!hasStorage) return fallback
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function writeStorage(key, value) {
  if (!hasStorage) return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can be unavailable in private browsing; the app remains usable in memory.
  }
}

export function removeStorage(key) {
  if (!hasStorage) return
  try {
    window.localStorage.removeItem(key)
  } catch {
    // No-op when storage is unavailable.
  }
}
