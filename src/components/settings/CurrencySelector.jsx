import { useTranslation } from 'react-i18next'
import Dropdown from '../ui/Dropdown'
import { useSettings } from '../../hooks/useSettings'
import { SUPPORTED_CURRENCIES } from '../../utils/formatCurrency'

const currencyLabels = {
  MGA: 'MGA — Ariary',
  USD: 'USD — US Dollar',
  EUR: 'EUR — Euro',
}

export default function CurrencySelector() {
  const { t } = useTranslation()
  const { settings, setCurrency } = useSettings()

  const options = SUPPORTED_CURRENCIES.map((code) => ({
    value: code,
    label: currencyLabels[code],
  }))

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-[var(--text-primary)]">
          {t('settings.currency')}
        </p>
        <p className="text-xs text-[var(--text-secondary)] mt-0.5">
          {t('settings.currencyDescription')}
        </p>
      </div>
      <Dropdown
        options={options}
        value={settings.currency}
        onChange={setCurrency}
        className="w-48"
      />
    </div>
  )
}
