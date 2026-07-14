import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { transactionService } from '../services/transactionService'

const TransactionsContext = createContext(null)

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState(() => transactionService.getAll())
  const [version, setVersion] = useState(0)

  const refresh = useCallback(() => {
    setTransactions(transactionService.getAll())
    setVersion((v) => v + 1)
  }, [])

  const addTransaction = useCallback(
    (data) => {
      const created = transactionService.create(data)
      refresh()
      return created
    },
    [refresh]
  )

  const editTransaction = useCallback(
    (id, data) => {
      const updated = transactionService.update(id, data)
      refresh()
      return updated
    },
    [refresh]
  )

  const removeTransaction = useCallback(
    (id) => {
      transactionService.delete(id)
      refresh()
    },
    [refresh]
  )

  const searchTransactions = useCallback((filters) => {
    return transactionService.search(filters)
  }, [])

  const value = useMemo(
    () => ({
      transactions,
      version,
      refresh,
      addTransaction,
      editTransaction,
      removeTransaction,
      searchTransactions,
    }),
    [transactions, version, refresh, addTransaction, editTransaction, removeTransaction, searchTransactions]
  )

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactionsContext() {
  const context = useContext(TransactionsContext)
  if (!context) {
    throw new Error('useTransactionsContext must be used within TransactionsProvider')
  }
  return context
}
