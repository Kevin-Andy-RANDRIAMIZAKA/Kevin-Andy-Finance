import { useTransactionsContext } from '../context/TransactionsContext'

export function useTransactions() {
  const {
    transactions,
    version,
    refresh,
    addTransaction,
    editTransaction,
    removeTransaction,
    searchTransactions,
  } = useTransactionsContext()

  return {
    transactions,
    version,
    refresh,
    addTransaction,
    editTransaction,
    removeTransaction,
    searchTransactions,
  }
}
