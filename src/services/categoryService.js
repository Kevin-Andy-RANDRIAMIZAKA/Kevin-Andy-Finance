import { storageAdapter } from './storage/localStorageAdapter'

const STORAGE_KEY = 'categories'

export const DEFAULT_CATEGORIES = [
  { id: 'food', labelKey: 'categories.food', icon: 'Utensils', type: 'expense' },
  { id: 'transport', labelKey: 'categories.transport', icon: 'Car', type: 'expense' },
  { id: 'shopping', labelKey: 'categories.shopping', icon: 'ShoppingBag', type: 'expense' },
  { id: 'salary', labelKey: 'categories.salary', icon: 'Banknote', type: 'income' },
  { id: 'business', labelKey: 'categories.business', icon: 'Briefcase', type: 'income' },
  { id: 'other', labelKey: 'categories.other', icon: 'MoreHorizontal', type: 'both' },
]

export const categoryService = {
  getAll() {
    const stored = storageAdapter.get(STORAGE_KEY)
    if (!stored || stored.length === 0) {
      storageAdapter.set(STORAGE_KEY, DEFAULT_CATEGORIES)
      return DEFAULT_CATEGORIES
    }
    return stored
  },

  getById(id) {
    return this.getAll().find((c) => c.id === id) || null
  },

  getByType(type) {
    return this.getAll().filter(
      (c) => c.type === type || c.type === 'both'
    )
  },
}
