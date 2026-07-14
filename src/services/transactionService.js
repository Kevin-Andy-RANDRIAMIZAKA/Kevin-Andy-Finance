import { storageAdapter } from './storage/localStorageAdapter'

const STORAGE_KEY = 'transactions'

function generateId() {
  return crypto.randomUUID()
}

export const transactionService = {
  getAll() {
    return storageAdapter.get(STORAGE_KEY) || []
  },

  getById(id) {
    return this.getAll().find((t) => t.id === id) || null
  },

  create(data) {
    const now = new Date().toISOString()
    const transaction = {
      id: generateId(),
      title: data.title,
      amount: Number(data.amount),
      type: data.type,
      category: data.category,
      date: data.date,
      notes: data.notes || '',
      createdAt: now,
      updatedAt: now,
    }
    const transactions = this.getAll()
    transactions.unshift(transaction)
    storageAdapter.set(STORAGE_KEY, transactions)
    return transaction
  },

  update(id, data) {
    const transactions = this.getAll()
    const index = transactions.findIndex((t) => t.id === id)
    if (index === -1) return null

    const updated = {
      ...transactions[index],
      ...data,
      amount: data.amount !== undefined ? Number(data.amount) : transactions[index].amount,
      updatedAt: new Date().toISOString(),
    }
    transactions[index] = updated
    storageAdapter.set(STORAGE_KEY, transactions)
    return updated
  },

  delete(id) {
    const transactions = this.getAll().filter((t) => t.id !== id)
    storageAdapter.set(STORAGE_KEY, transactions)
    return true
  },

  search(filters = {}) {
    let results = this.getAll()

    if (filters.type && filters.type !== 'all') {
      results = results.filter((t) => t.type === filters.type)
    }

    if (filters.category && filters.category !== 'all') {
      results = results.filter((t) => t.category === filters.category)
    }

    if (filters.search) {
      const query = filters.search.toLowerCase()
      results = results.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          (t.notes && t.notes.toLowerCase().includes(query))
      )
    }

    if (filters.dateFrom) {
      results = results.filter((t) => t.date >= filters.dateFrom)
    }

    if (filters.dateTo) {
      results = results.filter((t) => t.date <= filters.dateTo)
    }

    return results
  },
}
