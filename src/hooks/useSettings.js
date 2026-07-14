import { useSettingsContext } from '../context/SettingsContext'

export function useSettings() {
  const {
    settings,
    updateSettings,
    setLanguage,
    setCurrency,
    setTheme,
    toggleTheme,
  } = useSettingsContext()

  return {
    settings,
    updateSettings,
    setLanguage,
    setCurrency,
    setTheme,
    toggleTheme,
  }
}
