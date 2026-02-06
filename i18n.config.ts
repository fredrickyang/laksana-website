export const locales = ['id', 'en', 'zh'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'id'

export const localeNames: Record<Locale, string> = {
  id: 'Bahasa Indonesia',
  en: 'English',
  zh: '中文',
}

export const localeCodes: Record<Locale, string> = {
  id: 'ID',
  en: 'EN',
  zh: 'CN',
}
