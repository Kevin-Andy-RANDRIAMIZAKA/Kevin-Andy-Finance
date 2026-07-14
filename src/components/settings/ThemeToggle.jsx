import { useTranslation } from 'react-i18next'
import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSettings } from '../../hooks/useSettings'

export default function ThemeToggle({ compact = false }) {
  const { t } = useTranslation()
  const { settings, setTheme, toggleTheme } = useSettings()
  const isDark = settings.theme === 'dark'

  if (compact) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className="p-2.5 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        aria-label={t('settings.theme')}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? <Moon size={18} /> : <Sun size={18} />}
        </motion.div>
      </motion.button>
    )
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-[var(--text-primary)]">
          {t('settings.theme')}
        </p>
        <p className="text-xs text-[var(--text-secondary)] mt-0.5">
          {t('settings.themeDescription')}
        </p>
      </div>
      <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
        {['light', 'dark'].map((theme) => (
          <button
            key={theme}
            onClick={() => setTheme(theme)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${settings.theme === theme
                ? 'bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-[var(--shadow-soft)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }
            `}
          >
            {theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
            {t(`settings.${theme}`)}
          </button>
        ))}
      </div>
    </div>
  )
}
