// eslint-disable
{{ $searchDataFile := printf "json/%s.index.json" .Language.Lang }}
{{ $searchData := resources.Get "json/index.json" | resources.ExecuteAsTemplate $searchDataFile . | resources.Minify | resources.Fingerprint }}
{{ $searchConfig := i18n "searchConfig" | default "{}" }}

// eslint-enable
const dataJSON = '{{ $searchData.RelPermalink }}'
const dataConfig = {{ $searchConfig }}
const input = document.getElementById('search-input')
const results = document.getElementById('search-results')

const indexConfig = Object.assign(dataConfig, {
  doc: {
    id: 'id',
    field: ['title', 'summary'],
    store: ['parent', 'title', 'parent_title', 'url', 'summary', 'icon']
  }
})

const stringToHTML = (str) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(str, 'text/html')
  return doc.body.firstChild
}

function init () {
  input.removeEventListener('focus', init)
  input.required = true

  fetch(dataJSON)
    .then(pages => pages.json())
    .then(pages => {
      console.log(pages)
      // eslint-disable-next-line no-undef
      window.docsIndex = FlexSearch.create('balance', indexConfig)
      window.docsIndex.add(pages)
    })
    // eslint-disable-next-line no-return-assign
    .then(() => input.required = false)
    .then(search)
}

function truncate (str, length) {
  return str.length > length
    ? str.slice(0, length) + '...'
    : str
}

function search () {
  while (results.firstChild) {
    results.removeChild(results.firstChild)
  }

  if (!input.value) {
    return
  }

  const hits = window.docsIndex.search(input.value, 10)

  // Agrupar resultados dependiendo de la sección obteniendo la key 'parent'
  const groupedHits = hits.reduce((acc, hit) => {
    const parent = hit.parent
    const icon = hit.icon
    const parent_title = hit.parent_title
    if (!acc[parent]) {
      acc[parent] = []
    }
    acc[parent].push(Object.assign(hit, { icon, parent_title }))
    return acc
  }, {})

  // Recorrer los resultados agrupados y crear un elemento por cada grupo
  Object.keys(groupedHits).forEach((key) => {
    const group = groupedHits[key]
    const groupElement = stringToHTML(`<div class="search-group">
      <div class="search-group-title capitalize fs-6 fw-500 has-icon">
        <svg class="i i-${group[0].icon} flex-none" viewBox="0 0 24 24"><use href="/svg-sprite.svg#${group[0].icon}"></use></svg>
        <h3 class="">${group[0].parent_title}</h3>
      </div>
      <ul class="search-group-list"></ul>
    </div>`)
    const groupList = groupElement.querySelector('.search-group-list')

    group.forEach((page) => {
      const content = truncate(page.summary, 100)
      const data = stringToHTML(`<li class="search-item">
        <a class="search-link" href="${page.url}">
          <div class="search-title fs-6 fw-500">${page.title}</div>
          ${content === '' ? '' : '<p class="search-summary">' + content + '</p>'}
        </a>
      </li>`)
      groupList.appendChild(data)
    })
    results.appendChild(groupElement)
  })
}

function initSearch (input, container) {
  if (!input || !container) {
    return
  }

  input.addEventListener('focus', init)
  input.addEventListener('keyup', search)
}

initSearch(input, results)
