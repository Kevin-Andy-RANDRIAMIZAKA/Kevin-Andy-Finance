import { motion } from 'framer-motion'

const variants = {
  primary:
    'bg-accent text-white hover:bg-accent-hover shadow-sm',
  secondary:
    'bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--border-color)] border border-[var(--border-color)]',
  ghost:
    'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]',
  danger:
    'bg-danger text-white hover:opacity-90',
  success:
    'bg-success text-white hover:opacity-90',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  icon: Icon,
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={`
        inline-flex items-center justify-center gap-2 font-medium
        rounded-[var(--radius-button)] transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {Icon && <Icon size={16} strokeWidth={2} />}
      {children}
    </motion.button>
  )
}
