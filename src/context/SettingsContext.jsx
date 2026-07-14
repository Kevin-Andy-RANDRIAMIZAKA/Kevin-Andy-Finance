import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { settingsService } from '../services/settingsService'
import i18n from '../i18n'

const SettingsContext = createContext(null)

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => settingsService.get())

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme)
    document.documentElement.lang = settings.language
    i18n.changeLanguage(settings.language)
  }, [settings.theme, settings.language])

  const updateSettings = useCallback((partial) => {
    const updated = settingsService.update(partial)
    setSettings(updated)
    return updated
  }, [])

  const setLanguage = useCallback(
    (language) => updateSettings({ language }),
    [updateSettings]
  )

  const setCurrency = useCallback(
    (currency) => updateSettings({ currency }),
    [updateSettings]
  )

  const setTheme = useCallback(
    (theme) => updateSettings({ theme }),
    [updateSettings]
  )

  const toggleTheme = useCallback(() => {
    setTheme(settings.theme === 'light' ? 'dark' : 'light')
  }, [settings.theme, setTheme])

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        setLanguage,
        setCurrency,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettingsContext() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettingsContext must be used within SettingsProvider')
  }
  return context
}
