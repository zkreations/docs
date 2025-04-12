/*
{{ $searchDataFile := printf "json/%s.index.json" .Language.Lang }}
{{ $searchData := resources.Get "json/index.json" | resources.ExecuteAsTemplate $searchDataFile . | resources.Minify | resources.Fingerprint }}
*/

const dataJSON = '{{ $searchData.RelPermalink }}'
const input = document.getElementById('search-input')
const results = document.getElementById('search-results')
const currentVersion = document.getElementById('current-version')

// eslint-disable-next-line no-undef
const index = FlexSearch.Index({
  tokenize: 'forward',
  cache: true
})

// Object to store documents and sections
const documents = {}

function getCurrentVersion () {
  if (currentVersion) {
    return currentVersion.innerText.trim()
  }

  const path = window.location.pathname.split('/')
  const version = path[1]

  if (version && version.length > 0) {
    return version
  }

  return null
}

// Main function to initialize the search
async function initSearch () {
  input.removeEventListener('focus', initSearch)
  input.required = true

  try {
    // Load data from the JSON file
    const response = await fetch(dataJSON)
    const pages = await response.json()

    documents.pages = pages.documents
    documents.sections = pages.sections

    // Add documents to the index
    indexDocuments(documents.pages)
  } catch (error) {
    console.error('Error loading data:', error)
  }

  input.required = false
  search()
}

// Function to add documents to the search index
// @param pages: Array of documents
function indexDocuments (pages) {
  pages.forEach(page => {
    index.add(page.id, `${page.title} ${page.summary}`)
  })
}

// Function to search and display the results
async function search () {
  // Clear previous results
  results.innerHTML = ''

  if (!input.value) return

  try {
    const hits = await index.searchAsync(input.value, 100)

    const currentVersion = getCurrentVersion()
    const filteredHits = hits.filter(hitId => {
      const page = documents.pages.find(doc => doc.id === hitId)
      return page && page.parent.startsWith(`/${currentVersion}/`)
    })

    const groupedHits = groupResultsByParent(filteredHits)

    // Display grouped results
    displayGroupedResults(groupedHits)
  } catch (error) {
    console.error('Error in search:', error)
  }
}

// Function to group results by "parent"
// @param hits: Array of document IDs
// @returns Object with grouped results
function groupResultsByParent (hits) {
  return hits.reduce((groups, hitId) => {
    const page = documents.pages.find(doc => doc.id === hitId)
    if (page) {
      const parent = page.parent
      const section = documents.sections[parent] || {}
      const group = groups[parent] || {
        title: section.title || 'Untitled',
        icon: section.icon || '',
        iconContent: section.icon_content || '',
        pages: []
      }

      // Add page to the corresponding group
      group.pages.push(page)
      groups[parent] = group
    }
    return groups
  }, {})
}

// Function to display the grouped results
// @param groupedHits: Object with grouped results
function displayGroupedResults (groupedHits) {
  Object.values(groupedHits).forEach(group => {
    const groupElement = createGroupElement(group)
    results.appendChild(groupElement)
  })
}

// Function to create the HTML element for a group
// @param group: Object with group data
// @returns HTML element
function createGroupElement (group) {
  const groupElement = stringToHTML(`
    <div class="search-group">
      <div class="search-group-title capitalize fs-6 fw-500 has-icon">
        <svg class="i i-${group.icon} flex-none" viewBox="0 0 24 24">
          ${group.iconContent}
        </svg>
        <h3>${group.title}</h3>
      </div>
      <ul class="search-group-list"></ul>
    </div>
  `)

  const groupList = groupElement.querySelector('.search-group-list')
  group.pages.forEach(page => {
    const pageElement = createPageElement(page)
    groupList.appendChild(pageElement)
  })

  return groupElement
}

// Function to create the HTML element for a page
// @param page: Object with page data
// @returns HTML element
function createPageElement (page) {
  const summary = truncate(page.summary, 100)
  return stringToHTML(`
    <li class="search-item">
      <a class="search-link" href="${page.url}">
        <div class="search-title fs-6 fw-500">${page.title}</div>
        ${summary ? `<p class="search-summary">${summary}</p>` : ''}
      </a>
    </li>
  `)
}

// Function to truncate text to a specified length
// @param str: String to truncate
// @param length: Maximum length
function truncate (str, length) {
  return str.length > length ? `${str.slice(0, length)}...` : str
}

// Function to convert a string to an HTML node
// @param str: String to convert
// @returns HTML node
function stringToHTML (str) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(str, 'text/html')
  return doc.body.firstChild
}

// Function to initialize search events when the input is focused or when typing
function initSearchEvents () {
  input.addEventListener('focus', initSearch)
  input.addEventListener('keyup', (event) => {
    if (event.key.length === 1 || event.key === 'Backspace' || event.key === 'Delete') {
      search()
    }
  })
}

// Initialize the search events
initSearchEvents()
