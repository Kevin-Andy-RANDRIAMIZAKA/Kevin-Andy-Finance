import { storageAdapter } from './storage/localStorageAdapter'

const STORAGE_KEY = 'settings'

const DEFAULT_SETTINGS = {
  language: 'en',
  currency: 'MGA',
  theme: 'light',
}

export const settingsService = {
  get() {
    const stored = storageAdapter.get(STORAGE_KEY)
    return { ...DEFAULT_SETTINGS, ...stored }
  },

  update(partial) {
    const current = this.get()
    const updated = { ...current, ...partial }
    storageAdapter.set(STORAGE_KEY, updated)
    return updated
  },

  reset() {
    storageAdapter.set(STORAGE_KEY, DEFAULT_SETTINGS)
    return DEFAULT_SETTINGS
  },
}
