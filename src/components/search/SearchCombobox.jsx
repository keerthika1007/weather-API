import { Check, LoaderCircle, MapPin, Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { searchLocations } from '../../services/weatherApi'

export function SearchCombobox({ onSelect, onSubmit, initialValue = '', placeholder = 'Search for city, state or country…' }) {
  const [value, setValue] = useState(initialValue)
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const debounced = useDebounce(value, 320)
  const inputRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    if (debounced.trim().length < 2) {
      setSuggestions([])
      setLoading(false)
      return undefined
    }
    setLoading(true)
    searchLocations(debounced).then((items) => {
      if (!cancelled) { setSuggestions(items); setOpen(true); setActiveIndex(-1) }
    }).catch(() => {
      if (!cancelled) setSuggestions([])
    }).finally(() => {
      if (!cancelled) setLoading(false)
    })
    return () => { cancelled = true }
  }, [debounced])

  const select = (city) => {
    setValue(`${city.name}, ${city.country}`)
    setOpen(false)
    setSuggestions([])
    onSelect?.(city)
  }

  const submit = () => {
    const city = suggestions[activeIndex] ?? suggestions[0]
    if (city) select(city)
    else if (value.trim()) onSubmit?.(value.trim())
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); setActiveIndex((index) => Math.min(index + 1, suggestions.length - 1)) }
    if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((index) => Math.max(index - 1, 0)) }
    if (event.key === 'Escape') { setOpen(false); setActiveIndex(-1) }
    if (event.key === 'Enter') { event.preventDefault(); submit() }
  }

  return <div className="combobox" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}>
    <div className="search-input-wrap">
      <Search size={21} aria-hidden="true" />
      <label className="sr-only" htmlFor="city-search">Search for a city</label>
      <input ref={inputRef} id="city-search" value={value} onChange={(event) => { setValue(event.target.value); setOpen(true) }} onFocus={() => suggestions.length && setOpen(true)} onKeyDown={handleKeyDown} placeholder={placeholder} autoComplete="off" aria-autocomplete="list" aria-controls="city-suggestions" aria-expanded={open} />
      {value && <button className="icon-button icon-button-small" type="button" aria-label="Clear search" onClick={() => { setValue(''); setSuggestions([]); inputRef.current?.focus() }}><X size={15} /></button>}
      {loading && <LoaderCircle className="spin" size={18} aria-label="Loading suggestions" />}
    </div>
    <button className="button button-primary search-submit" type="button" onClick={submit}><Search size={17} aria-hidden="true" /> Search</button>
    {open && (suggestions.length > 0 || (!loading && value.trim().length > 1)) && <div className="suggestions-menu" id="city-suggestions" role="listbox">
      {suggestions.length ? suggestions.map((city, index) => <button type="button" key={city.id} className={`suggestion-item ${index === activeIndex ? 'active' : ''}`} onMouseDown={(event) => event.preventDefault()} onClick={() => select(city)} role="option" aria-selected={index === activeIndex}><MapPin size={17} /><span><strong>{city.name}</strong><small>{city.admin1 ? `${city.admin1}, ` : ''}{city.country}</small></span>{index === activeIndex && <Check size={16} />}</button>) : <div className="suggestion-empty">No cities found. Try a nearby place.</div>}
    </div>}
  </div>
}
