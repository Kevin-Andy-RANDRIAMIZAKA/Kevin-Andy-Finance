import { useCallback } from 'react'
import { formatCurrency, getCurrencySymbol } from '../utils/formatCurrency'
import { useSettings } from './useSettings'

export function useCurrencyFormat() {
  const { settings } = useSettings()
  const currency = settings.currency

  const format = useCallback(
    (amount) => formatCurrency(amount, currency),
    [currency]
  )

  const symbol = getCurrencySymbol(currency)

  return { format, currency, symbol }
}
