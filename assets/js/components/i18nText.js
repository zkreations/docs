// Get the i18n text from the global I18N object
// @param key: The key to access the translation
// @param fallback: The fallback text if the key is not found
// @returns The translated text or the fallback text
export function i18nText (key, fallback = '') {
  const keys = key.split('.')
  let result = window.I18N

  for (const k of keys) {
    if (result && Object.prototype.hasOwnProperty.call(result, k)) {
      result = result[k]
    } else {
      return fallback
    }
  }

  return typeof result === 'string' ? result : fallback
}
