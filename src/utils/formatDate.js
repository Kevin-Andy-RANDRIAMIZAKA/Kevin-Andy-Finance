export function formatDate(dateString, locale = 'en') {
  const date = new Date(dateString)
  const localeMap = { en: 'en-GB', mg: 'fr-MG' }
  return new Intl.DateTimeFormat(localeMap[locale] || 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function formatDateShort(dateString, locale = 'en') {
  const date = new Date(dateString)
  const localeMap = { en: 'en-GB', mg: 'fr-MG' }
  return new Intl.DateTimeFormat(localeMap[locale] || 'en-GB', {
    day: 'numeric',
    month: 'short',
  }).format(date)
}

export function formatMonthYear(dateString, locale = 'en') {
  const date = new Date(dateString)
  const localeMap = { en: 'en-GB', mg: 'fr-MG' }
  return new Intl.DateTimeFormat(localeMap[locale] || 'en-GB', {
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function toInputDate(date = new Date()) {
  return date.toISOString().split('T')[0]
}
