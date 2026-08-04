import { ChevronDown } from 'lucide-react'

export function SelectField({ label, value, onChange, options }) {
  return <label className="select-field">{label && <span className="sr-only">{label}</span>}<select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ChevronDown size={17} aria-hidden="true" /></label>
}
