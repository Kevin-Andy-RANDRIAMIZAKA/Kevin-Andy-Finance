import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../locales/en/translation.json'
import mg from '../locales/mg/translation.json'
import { settingsService } from '../services/settingsService'

const savedLanguage = settingsService.get().language

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    mg: { translation: mg },
  },
  lng: savedLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
