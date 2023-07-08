const TOC = document.querySelector('.toc')
const TOC_TOGGLE = document.querySelector('.toc-toggle')
const DOCS = document.querySelector('.article-body')

function isVisible (elem) {
  const bounding = elem.getBoundingClientRect()
  return (
    bounding.top >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  )
}

if (TOC_TOGGLE && TOC) {
  TOC_TOGGLE.onclick = () => {
    if (isVisible(TOC)) {
      TOC.classList.toggle('is-active')
      TOC_TOGGLE.classList.toggle('is-active')
    }
  }
}

// Recorrer todos los enlaces del toc y comparar fragmentos
const tocLinks = TOC.querySelectorAll('a')

function onScroll () {
  const sections = DOCS.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')

  // Obtener el valor de la variable css --header-height
  const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'))
  const scrollPosition = (document.documentElement.scrollTop || document.body.scrollTop) + (headerHeight + 20)

  sections.forEach((section) => {
    if (section.offsetTop <= scrollPosition) {
      const tocLink = TOC.querySelector(`a[href="#${section.getAttribute('id')}"]`)
      tocLinks.forEach((link) => link.classList.remove('is-visible'))
      tocLink.classList.add('is-visible')
    }
  })
}

window.addEventListener('scroll', onScroll)
window.addEventListener('resize', onScroll)
window.addEventListener('load', onScroll)
