import { CloudOff, RefreshCw, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

export function StatusBanner({ isOnline, message, onRetry, onDismiss }) {
  return (
    <AnimatePresence>
      {(!isOnline || message) && (
        <motion.div className={`status-banner ${isOnline ? 'status-banner-info' : 'status-banner-offline'}`} initial={{ y: -18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }} role="status" aria-live="polite">
          <CloudOff size={18} aria-hidden="true" />
          <span>{isOnline ? message : 'You are offline. Cached weather data is still available.'}</span>
          {isOnline && onRetry && <button className="status-action" type="button" onClick={onRetry}><RefreshCw size={15} /> Retry</button>}
          {onDismiss && <button className="icon-button icon-button-small" type="button" onClick={onDismiss} aria-label="Dismiss status"><X size={16} /></button>}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
