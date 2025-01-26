const THEME_HANDLE = document.querySelectorAll('.theme-handle > *')

let userPreference = localStorage.getItem('theme') || 'system'

function saveUserPreference (userPreference) {
  localStorage.setItem('theme', userPreference)
}

function getAppliedMode (userPreference) {
  if (userPreference === 'light') {
    return 'light'
  }
  if (userPreference === 'dark') {
    return 'dark'
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function setAppliedMode (mode) {
  document.documentElement.className = mode
  document.querySelector('meta[name="color-scheme"]').content = mode
}

function handleThemeToggleClick (handle) {
  const newUserPref = handle.dataset.theme
  userPreference = newUserPref
  saveUserPreference(newUserPref)
  setAppliedMode(getAppliedMode(newUserPref))

  THEME_HANDLE.forEach((el) => {
    el.classList.toggle('is-active', el.dataset.theme === userPreference)
  })
}

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
