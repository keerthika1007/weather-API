import { AlertTriangle, RefreshCw } from 'lucide-react'

export function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="error-state" role="alert">
      <AlertTriangle size={22} aria-hidden="true" />
      <div>
        <strong>Weather data unavailable</strong>
        <p>{message}</p>
      </div>
      {onRetry && (
        <button className="button button-ghost" type="button" onClick={onRetry}>
          <RefreshCw size={16} aria-hidden="true" /> Retry
        </button>
      )}
    </div>
  )
}
