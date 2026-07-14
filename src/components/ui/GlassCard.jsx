import { motion } from 'framer-motion'

export default function GlassCard({
  children,
  className = '',
  hover = false,
  delay = 0,
  onClick,
}) {
  const Component = onClick ? motion.button : motion.div

  return (
    <Component
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={`glass-card rounded-[var(--radius-card)] p-6 ${onClick ? 'cursor-pointer text-left w-full' : ''} ${className}`}
    >
      {children}
    </Component>
  )
}
