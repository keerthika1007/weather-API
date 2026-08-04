import { Compass, Home, Search, Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/explore', label: 'Explore', icon: Compass },
]

export function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="profile-block">
        <div className="profile-avatar-wrap">
          <img src="https://res.cloudinary.com/dm6crwd0y/image/upload/v1784746064/ChatGPT_Image_Jul_23_2026_12_16_48_AM_gximdq.png" width="100" height="150" alt="Kevin, your Weather Assistant" className="profile-avatar" />
        </div>
        <strong>Kevin</strong>
        <span>Weather Assistant <span aria-hidden="true"></span></span>
      </div>
      <div className="sidebar-divider" />
      <nav className="sidebar-nav">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Icon size={21} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <NavLink to="/settings" className={({ isActive }) => `nav-link nav-link-settings ${isActive ? 'active' : ''}`}>
        <Settings size={21} aria-hidden="true" />
        <span>Settings</span>
      </NavLink>
    </aside>
  )
}
