const THEME_HANDLE = document.querySelectorAll('.theme-handle > *')

let userPreference = localStorage.getItem('theme') || 'system'

// Function to save user preference in localStorage
// @param userPreference: User's theme preference (light, dark, or system)
// @returns void
function saveUserPreference (userPreference) {
  localStorage.setItem('theme', userPreference)
}

// Function to get the applied mode based on user preference
// @param userPreference: User's theme preference (light, dark, or system)
// @returns string: Applied mode (light or dark)
function getAppliedMode (userPreference) {
  if (userPreference === 'light') {
    return 'light'
  }
  if (userPreference === 'dark') {
    return 'dark'
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

// Function to set the applied mode and update meta tag
// @param mode: Mode to be applied (light or dark)
// @returns void
function setAppliedMode (mode) {
  document.documentElement.className = mode
  document.querySelector('meta[name="color-scheme"]').content = mode
}

// Function to handle theme toggle click event
// @param handle: Element that triggered the click event
// @returns void
function handleThemeToggleClick (handle) {
  const newUserPref = handle.dataset.theme
  userPreference = newUserPref
  saveUserPreference(newUserPref)
  setAppliedMode(getAppliedMode(newUserPref))

  THEME_HANDLE.forEach((el) => {
    el.classList.toggle('is-active', el.dataset.theme === userPreference)
  })
}

// Function to handle system color scheme change event
// @param event: Event object from the media query listener
// @returns void
function handleSystemColorSchemeChange (event) {
  if (userPreference === 'system') {
    if (event.matches) {
      setAppliedMode('dark')
    } else {
      setAppliedMode('light')
    }
  }
}

// Event listener for system color scheme change
const systemColorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
systemColorSchemeMediaQuery.addEventListener('change', handleSystemColorSchemeChange)

// Initialize theme toggle based on user preference
setAppliedMode(getAppliedMode(userPreference))

// Add click event listener to theme handles
THEME_HANDLE.forEach((handle) => {
  handle.addEventListener('click', () => handleThemeToggleClick(handle))
  handle.classList.toggle('is-active', handle.dataset.theme === userPreference)
})
