import { ArrowUpRight, Globe2 } from 'lucide-react'

export function RegionCard({ region, onClick }) {
  return <button type="button" className="region-card" onClick={onClick}><Globe2 className="region-map-mark" size={72} strokeWidth={1} aria-hidden="true" /><div><strong>{region.title}</strong><span>View weather across {region.detail}</span></div><ArrowUpRight size={17} className="region-arrow" /></button>
}
