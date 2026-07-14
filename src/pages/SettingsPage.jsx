import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import TopBar from '../components/layout/TopBar'
import GlassCard from '../components/ui/GlassCard'
import LanguageSwitcher from '../components/settings/LanguageSwitcher'
import CurrencySelector from '../components/settings/CurrencySelector'
import ThemeToggle from '../components/settings/ThemeToggle'

export default function SettingsPage() {
  const { t } = useTranslation()

  return (
    <div>
      <TopBar title={t('settings.title')} subtitle={t('settings.subtitle')} />

      <div className="px-4 lg:px-8 py-6 lg:py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <GlassCard delay={0.1}>
            <LanguageSwitcher />
          </GlassCard>

          <GlassCard delay={0.15}>
            <CurrencySelector />
          </GlassCard>

          <GlassCard delay={0.2}>
            <ThemeToggle />
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}
