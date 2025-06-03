// Get the saved theme from localStorage or default to 'light'
const storedTheme = localStorage.getItem('theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

// Determine the active theme
const theme = storedTheme === 'system'
  ? (prefersDark ? 'dark' : 'light')
  : (storedTheme || 'light')

// Apply the theme class to the root element
document.documentElement.classList.add(theme)
