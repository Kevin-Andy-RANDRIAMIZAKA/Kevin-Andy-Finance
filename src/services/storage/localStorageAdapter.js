import { storageAdapter as adapterInterface } from './storageAdapter'

const PREFIX = 'kaf_'

function getKey(key) {
  return `${PREFIX}${key}`
}

export const localStorageAdapter = {
  get(key) {
    try {
      const raw = localStorage.getItem(getKey(key))
      if (raw === null) return null
      return JSON.parse(raw)
    } catch {
      return null
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(getKey(key), JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(getKey(key))
      return true
    } catch {
      return false
    }
  },
}

// Default export used by services
export const storageAdapter = localStorageAdapter

// Re-export interface for documentation
export { adapterInterface }
