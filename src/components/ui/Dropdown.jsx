import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  const selected = options.find((opt) => opt.value === value)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full flex items-center justify-between gap-2
          px-4 py-2.5 rounded-[var(--radius-button)]
          bg-[var(--bg-tertiary)] border border-[var(--border-color)]
          text-[var(--text-primary)] text-sm font-medium
          hover:border-[var(--text-tertiary)] transition-colors
        "
      >
        <span className="flex items-center gap-2">
          {selected?.icon && <selected.icon size={16} />}
          {selected?.label || placeholder}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-[var(--text-secondary)]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="
              absolute z-20 mt-1 w-full
              bg-[var(--bg-secondary)] border border-[var(--border-color)]
              rounded-[var(--radius-button)] shadow-[var(--shadow-card)]
              overflow-hidden
            "
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className="
                  w-full flex items-center justify-between gap-2
                  px-4 py-2.5 text-sm text-left
                  hover:bg-[var(--bg-tertiary)] transition-colors
                  text-[var(--text-primary)]
                "
              >
                <span className="flex items-center gap-2">
                  {option.icon && <option.icon size={16} />}
                  {option.label}
                </span>
                {value === option.value && <Check size={16} className="text-accent" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
