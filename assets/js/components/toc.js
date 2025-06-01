const TOC = document.querySelector('.toc')
const TOC_TOGGLE = document.querySelector('.toc-toggle')
const DOCS = document.querySelector('.article-body')
const VISIBLE_CLASS = 'is-visible'
const ACTIVE_CLASS = 'is-active'

// Checks if an element is visible within the viewport.
// @param {Element} elem - The DOM element to check.
// @returns {boolean}
function isVisible (elem) {
  const bounding = elem.getBoundingClientRect()
  return (
    bounding.top >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  )
}

// Handles the scroll event to highlight the active section in the TOC.
function onScroll () {
  if (!DOCS || !TOC) {
    return
  }

  const sections = DOCS.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')
  if (sections.length === 0) {
    return
  }

  const tocLinks = TOC.querySelectorAll('a')
  if (tocLinks.length === 0) {
    return
  }

  const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'))
  const scrollPosition = (document.documentElement.scrollTop || document.body.scrollTop) + (headerHeight + 20)

  sections.forEach((section) => {
    if (section.offsetTop <= scrollPosition) {
      const tocLink = TOC.querySelector(`a[href="#${section.getAttribute('id')}"]`)
      if (tocLink) {
        tocLinks.forEach((link) => link.classList.remove(VISIBLE_CLASS))
        tocLink.classList.add(VISIBLE_CLASS)
      }
    }
  })
}

// Initializes the Table of Contents (TOC) functionality.
function initToc () {
  if (!TOC || !TOC_TOGGLE) {
    return
  }

  TOC_TOGGLE.onclick = () => {
    if (isVisible(TOC)) {
      TOC.classList.toggle(ACTIVE_CLASS)
      TOC_TOGGLE.classList.toggle(ACTIVE_CLASS)
    }
  }

  window.addEventListener('scroll', onScroll)
  window.addEventListener('resize', onScroll)
  window.addEventListener('load', onScroll)
}

// Initialize TOC
initToc()
