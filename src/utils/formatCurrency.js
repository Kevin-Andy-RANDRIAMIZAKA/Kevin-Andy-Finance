const CURRENCY_CONFIG = {
  MGA: { code: 'MGA', locale: 'fr-MG', minimumFractionDigits: 0, maximumFractionDigits: 0 },
  USD: { code: 'USD', locale: 'en-US', minimumFractionDigits: 2, maximumFractionDigits: 2 },
  EUR: { code: 'EUR', locale: 'de-DE', minimumFractionDigits: 2, maximumFractionDigits: 2 },
}

export function formatCurrency(amount, currency = 'MGA') {
  const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.MGA
  const value = Number(amount) || 0

  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: config.minimumFractionDigits,
    maximumFractionDigits: config.maximumFractionDigits,
  }).format(value)
}

export function getCurrencySymbol(currency = 'MGA') {
  const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.MGA
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .formatToParts(0)
    .find((part) => part.type === 'currency')?.value || config.code
}

export const SUPPORTED_CURRENCIES = ['MGA', 'USD', 'EUR']
