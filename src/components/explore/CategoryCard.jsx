import { ArrowUpRight, CloudDrizzle, CloudLightning, CloudSnow, Sunrise, Sun, Wind } from 'lucide-react'

const icons = { sun: Sun, rain: CloudDrizzle, snow: CloudSnow, wind: Wind, sunrise: Sunrise, storm: CloudLightning }

export function CategoryCard({ category, onClick }) {
  const Icon = icons[category.icon] ?? Sun
  return <button type="button" className={`category-card category-${category.icon}`} onClick={onClick}><span className="category-icon"><Icon size={23} /></span><span><strong>{category.title}</strong><small>{category.description}</small></span><ArrowUpRight size={17} className="category-arrow" /></button>
}
