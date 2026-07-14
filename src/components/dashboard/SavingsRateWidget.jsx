import { motion } from 'framer-motion'
import GlassCard from '../ui/GlassCard'

export default function SavingsRateWidget({ rate, label }) {
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (rate / 100) * circumference

  const getColor = () => {
    if (rate >= 50) return 'text-success'
    if (rate >= 20) return 'text-accent'
    return 'text-warning'
  }

  return (
    <GlassCard delay={0.2} className="flex flex-col items-center justify-center">
      <p className="text-sm font-medium text-[var(--text-secondary)] mb-4 self-start">
        {label}
      </p>
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="var(--bg-tertiary)"
            strokeWidth="8"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className={getColor()}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
            style={{
              strokeDasharray: circumference,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className={`text-2xl font-bold ${getColor()}`}
          >
            {rate}%
          </motion.span>
        </div>
      </div>
    </GlassCard>
  )
}
