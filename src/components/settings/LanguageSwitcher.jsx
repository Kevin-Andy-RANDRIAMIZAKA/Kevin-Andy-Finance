import { useTranslation } from 'react-i18next'
import Dropdown from '../ui/Dropdown'
import { useSettings } from '../../hooks/useSettings'

export default function LanguageSwitcher() {
  const { t } = useTranslation()
  const { settings, setLanguage } = useSettings()

  const options = [
    { value: 'en', label: `${t('settings.english')} 🇬🇧` },
    { value: 'mg', label: `${t('settings.malagasy')} 🇲🇬` },
  ]

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-[var(--text-primary)]">
          {t('settings.language')}
        </p>
        <p className="text-xs text-[var(--text-secondary)] mt-0.5">
          {t('settings.languageDescription')}
        </p>
      </div>
      <Dropdown
        options={options}
        value={settings.language}
        onChange={setLanguage}
        className="w-48"
      />
    </div>
  )
}
