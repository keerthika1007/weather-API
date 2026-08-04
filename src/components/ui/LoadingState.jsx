export function LoadingState({ label = 'Loading weather data…' }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <div className="loading-orb" aria-hidden="true" />
      <p>{label}</p>
    </div>
  )
}
