class FilterView {
  _parentElement = document.querySelector('#filter')

  addHandlerFilter(handler) {
    if (!this._parentElement) return

    this._parentElement.addEventListener('change', handler)
  }

  getQuery() {
    const query = this._parentElement.value
    return query
  }
}

export default new FilterView()
