class SearchView {
  _parentElement = document.querySelector('#search')

  addHanlderSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault()
      handler()
    })
  }

  getQuery() {
    const query = this._parentElement.querySelector('#search-input').value.trim()
    this._clearInput()
    return query
  }

  _clearInput() {
    this._parentElement.querySelector('#search-input').value = ''
  }
}

export default new SearchView()
