import { translations } from '@/lib/utils/translations'
import { getLocales } from 'expo-localization'
import { I18n } from 'i18n-js'

export const i18n = new I18n(translations)

// Configure i18n
i18n.locale = getLocales()[0].languageCode ?? 'en'
i18n.enableFallback = true
