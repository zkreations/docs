const THEME_HANDLE = document.querySelectorAll('.theme-handle > *')
const ACTIVE_CLASS = 'is-active'
const LIGHT_MODE = 'light'
const DARK_MODE = 'dark'
const SYSTEM_MODE = 'system'

let userPreference = null
let systemColorSchemeMediaQuery = null

// Saves the user preference in localStorage
// @param pref: The user preference (LIGHT_MODE, DARK_MODE, or SYSTEM_MODE)
// @returns void
function saveUserPreference (pref) {
  localStorage.setItem('theme', pref)
}

// Determines the applied mode
// @param pref: The user preference for theme (LIGHT_MODE, DARK_MODE, or SYSTEM_MODE)
// @returns LIGHT_MODE or DARK_MODE based on the preference or system settings
function getAppliedMode (pref) {
  if (pref === LIGHT_MODE) return LIGHT_MODE
  if (pref === DARK_MODE) return DARK_MODE
  return window.matchMedia('(prefers-color-scheme: light)').matches ? LIGHT_MODE : DARK_MODE
}

// Sets the applied mode by updating the document's class and meta tag
// @param mode: The mode to apply (LIGHT_MODE or DARK_MODE)
// @returns void
function setAppliedMode (mode) {
  document.documentElement.className = mode
  document.querySelector('meta[name="color-scheme"]').content = mode
}

// Handles the click event on theme toggle buttons
// Updates the user preference and applies the new theme
// @param handle: The clicked theme toggle button element
// @returns void
function handleThemeToggleClick (handle) {
  const newUserPref = handle.dataset.theme
  userPreference = newUserPref
  saveUserPreference(newUserPref)
  setAppliedMode(getAppliedMode(newUserPref))

  THEME_HANDLE.forEach(el => {
    el.classList.toggle(ACTIVE_CLASS, el.dataset.theme === userPreference)
  })
}

// Handles the system color scheme change event
function handleSystemColorSchemeChange (event) {
  if (userPreference === SYSTEM_MODE) {
    setAppliedMode(event.matches ? DARK_MODE : LIGHT_MODE)
  }
}

// Checks if the theme can be initialized
function canInitTheme () {
  return THEME_HANDLE.length > 0 && 'matchMedia' in window && typeof window.matchMedia === 'function'
}

// Initializes the theme functionality
function initTheme () {
  if (!canInitTheme()) return

  userPreference = localStorage.getItem('theme') || SYSTEM_MODE
  systemColorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  systemColorSchemeMediaQuery.addEventListener('change', handleSystemColorSchemeChange)

  setAppliedMode(getAppliedMode(userPreference))

  THEME_HANDLE.forEach(handle => {
    handle.addEventListener('click', () => handleThemeToggleClick(handle))
    handle.classList.toggle(ACTIVE_CLASS, handle.dataset.theme === userPreference)
  })
}

initTheme()
