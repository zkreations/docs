// Obtener el tema actual del almacenamiento local o establecerlo en "light" por defecto
let currentTheme = localStorage.getItem('current_theme') || 'light'

// Si el tema actual es "system", determinar el tema basado en las preferencias del sistema
if (currentTheme === 'system') {
  currentTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Agregar la clase del tema actual al elemento root del documento
document.documentElement.classList.add(currentTheme)
