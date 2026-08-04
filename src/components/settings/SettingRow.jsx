export function SettingRow({ icon, title, description, children, className = '' }) {
  return <div className={`setting-row ${className}`}><div className="setting-row-icon">{icon}</div><div className="setting-row-copy"><strong>{title}</strong><span>{description}</span></div><div className="setting-row-control">{children}</div></div>
}
