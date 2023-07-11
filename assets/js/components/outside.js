const buttons = document.querySelectorAll('[data-outside]')

const ACTIVE_CLASS = 'is-active'

// Función para cerrar un elemento al hacer click fuera de él
// @param {HTMLElement} button Botón que abre el elemento
function outsideClick (button) {
  if (!button) return

  const target = document.getElementById(button.dataset.outside)

  if (!target) return

  button.addEventListener('click', () => {
    button.classList.toggle(ACTIVE_CLASS)
    target.classList.toggle(ACTIVE_CLASS)
  })

  const clickOutside = (event) => {
    if (!target.contains(event.target) && !button.contains(event.target)) {
      button.classList.remove(ACTIVE_CLASS)
      target.classList.remove(ACTIVE_CLASS)
    }
  }

  document.addEventListener('click', clickOutside)

  const close = target.querySelector('[data-close]')

  if (close) {
    close.onclick = function () {
      target.classList.remove(ACTIVE_CLASS)
    }
  }
}

// Recorrer todos los botones que tengan el atributo data-outside
buttons.forEach((button) => {
  outsideClick(button)
})
