/**
 * Storage adapter interface.
 * Swap localStorageAdapter for a Supabase adapter without changing services.
 */
export const storageAdapter = {
  get(key) {
    throw new Error('storageAdapter.get() must be implemented')
  },
  set(key, value) {
    throw new Error('storageAdapter.set() must be implemented')
  },
  remove(key) {
    throw new Error('storageAdapter.remove() must be implemented')
  },
}
