const THEME_HANDLE = document.querySelectorAll('.theme-handle > *')

let userPreference = null
let systemColorSchemeMediaQuery = null

// Saves the user preference in localStorage
// @param pref: The user preference ('light', 'dark', or 'system')
// @returns void
function saveUserPreference (pref) {
  localStorage.setItem('theme', pref)
}

// Determines the applied mode
// @param pref: The user preference for theme ('light', 'dark', or 'system')
// @returns 'light' or 'dark' based on the preference or system settings
function getAppliedMode (pref) {
  if (pref === 'light') return 'light'
  if (pref === 'dark') return 'dark'
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

// Sets the applied mode by updating the document's class and meta tag
// @param mode: The mode to apply ('light' or 'dark')
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
    el.classList.toggle('is-active', el.dataset.theme === userPreference)
  })
}

// Handles the system color scheme change event
function handleSystemColorSchemeChange (event) {
  if (userPreference === 'system') {
    setAppliedMode(event.matches ? 'dark' : 'light')
  }
}

// Checks if the theme can be initialized
function canInitTheme () {
  return THEME_HANDLE.length > 0 && 'matchMedia' in window && typeof window.matchMedia === 'function'
}

// Initializes the theme functionality
function initTheme () {
  if (!canInitTheme()) return

  userPreference = localStorage.getItem('theme') || 'system'
  systemColorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  systemColorSchemeMediaQuery.addEventListener('change', handleSystemColorSchemeChange)

  setAppliedMode(getAppliedMode(userPreference))

  THEME_HANDLE.forEach(handle => {
    handle.addEventListener('click', () => handleThemeToggleClick(handle))
    handle.classList.toggle('is-active', handle.dataset.theme === userPreference)
  })
}

initTheme()
