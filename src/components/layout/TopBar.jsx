import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import ThemeToggle from '../settings/ThemeToggle'

export default function TopBar({ title, subtitle }) {
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-30 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-color)]">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4 lg:py-6">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-xl lg:text-2xl font-bold text-[var(--text-primary)]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">{subtitle}</p>
          )}
        </motion.div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-xs text-[var(--text-tertiary)]">{t('app.name')}</p>
          </div>
          <ThemeToggle compact />
        </div>
      </div>
    </header>
  )
}
