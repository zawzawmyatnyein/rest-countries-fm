export default class View {
  _data

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError()
    }

    this._data = data
    const markup = this._generateMarkup()

    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  _clear() {
    this._parentElement.innerHTML = ''
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="text-2xl text-dark-blue-text dark:text-light-gray font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">${message}</div>`

    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }
}
