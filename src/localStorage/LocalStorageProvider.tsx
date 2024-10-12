class LocalStorageProvider {
  constructor() {
    if (!window.localStorage) {
      throw new Error('LocalStorage is not supported in this environment.')
    }
  }

  setItem(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error('Error setting item in LocalStorage', e)
    }
  }

  getItem(key: string) {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (e) {
      console.error('Error getting item from LocalStorage', e)
      return null
    }
  }

  removeItem(key: string) {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.error('Error removing item from LocalStorage', e)
    }
  }

  clear() {
    try {
      localStorage.clear()
    } catch (e) {
      console.error('Error clearing LocalStorage', e)
    }
  }

  keyExists(key: string) {
    return localStorage.getItem(key) !== null
  }
}

export default new LocalStorageProvider()
