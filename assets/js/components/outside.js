const buttons = document.querySelectorAll('[data-outside]')

// Función para cerrar un elemento al hacer click fuera de él
// @param {HTMLElement} button Botón que abre el elemento
function outsideClick (button) {
  if (!button) return

  const target = document.getElementById(button.dataset.outside)

  if (!target) return

  button.addEventListener('click', () => {
    button.classList.toggle('is-active')
    target.classList.toggle('is-active')
  })

  const clickOutside = (event) => {
    if (!target.contains(event.target) && !button.contains(event.target)) {
      button.classList.remove('is-active')
      target.classList.remove('is-active')
    }
  }

  document.addEventListener('click', clickOutside)
}

// Recorrer todos los botones que tengan el atributo data-outside
buttons.forEach((button) => {
  outsideClick(button)
})
