import View from './View'
import { formatNums, convertArrToStr } from '../utilities'

class DetailView extends View {
  _parentElement = document.querySelector('#country')
  _errorMessage = 'No country detail found for your page! Please try again'

  addHandlerRender(handler) {
    if (!this._parentElement) return

    // prettier-ignore
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler))
  }

  renderLoading() {
    const markup = `
        <div class="animate-pulse w-full h-56 lg:h-80 bg-gray-300 dark:bg-dark-blue overflow-hidden shadow">
        </div>
        <div class="animate-pulse space-y-8">
            <div class="h-8 w-2/5 bg-gray-300 dark:bg-dark-blue"></div>
            <div class="space-y-8 sm:space-y-0 sm:flex sm:gap-x-4 sm:justify-between sm:items-start">
                <div class="flex-1 space-y-2">
                    <div class="h-4 w-1/2 bg-gray-300 dark:bg-dark-blue"></div>
                    <div class="h-4 w-2/3 bg-gray-300 dark:bg-dark-blue"></div>
                    <div class="h-4 w-1/2 bg-gray-300 dark:bg-dark-blue"></div>
                    <div class="h-4 w-2/3 bg-gray-300 dark:bg-dark-blue"></div>
                    <div class="h-4 w-1/2 bg-gray-300 dark:bg-dark-blue"></div>
                </div>
                <div class="flex-1 space-y-2">
                    <div class="h-4 w-1/2 bg-gray-300 dark:bg-dark-blue"></div>
                    <div class="h-4 w-2/3 bg-gray-300 dark:bg-dark-blue"></div>
                    <div class="h-4 w-1/2 bg-gray-300 dark:bg-dark-blue"></div>
                </div>
            </div>
            <div class="space-y-4 lg:space-y-0 lg:flex lg:items-start lg:gap-x-4">
                <div class="h-4 w-1/3 bg-gray-300 dark:bg-dark-blue"></div>
                <div class="flex-1 flex gap-2">
                    <div class="h-8 w-1/4 bg-gray-300 dark:bg-dark-blue"></div>
                    <div class="h-8 w-1/4 bg-gray-300 dark:bg-dark-blue"></div>
                    <div class="h-8 w-1/4 bg-gray-300 dark:bg-dark-blue"></div>
                    <div class="h-8 w-1/4 bg-gray-300 dark:bg-dark-blue"></div>
                </div>
            </div>
        </div>
    `
    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  _generateMarkup() {
    // prettier-ignore
    return `
        <div class="w-full bg-white dark:bg-dark-blue overflow-hidden shadow">
            <img class="w-full h-full object-cover" src="${this._data.flag}" alt="Flag of ${this._data.officialName}">
        </div>
        <div class="space-y-8">
            <h2 class="text-xl font-extrabold">${this._data.officialName}</h2>
            <div class="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-start sm:mr-8">
                <div class="font-semibold text-sm space-y-2">
                    <div>Native Name: <span class="font-light">${this._data.nativeName}</span></div>
                    <div>Population: <span class="font-light">${formatNums(this._data.population)}</span></div>
                    <div>Region: <span class="font-light">${this._data.region}</span></div>
                    <div>Sub Region: <span class="font-light">${this._data.subregion}</span></div>
                    <div>Capital: <span class="font-light">${convertArrToStr(this._data.capital)}</span></div>
                </div>
                <div class="font-semibold text-sm space-y-2">
                    <div>Top Level Domain: <span class="font-light">${this._data.tld[0]}</span></div>
                    <div>Currencies: <span class="font-light">${this._data.currencies.name}</span></div>
                    <div>Languages: <span class="font-light">${convertArrToStr(this._data.languages)}</span></div>
                </div>
            </div>
            <div class="space-y-4 lg:space-y-0 lg:flex lg:items-start lg:gap-x-4">
                <h3 class="shrink-0 font-semibold">Border Countries:</h3>
                <div class="flex flex-wrap gap-2">
                    ${this._data.borderCountries && this._data.borderCountries.map(country => {
                        return `<a href="/country.html#${country}" class="inline-block border-none bg-white dark:bg-dark-blue shadow-md text-sm py-2 px-4">${country}</a>`
                    }).join('')}
                </div>
            </div>
        </div>
    `
  }
}

export default new DetailView()
