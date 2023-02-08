import View from './View'
import { formatNums, convertArrToStr } from '../utilities'

class CountriesView extends View {
  _parentElement = document.querySelector('#countries')
  _errorMessage = 'No country found for your search term! Please try again'

  addHandlerRender(handler) {
    window.addEventListener('load', handler)
  }

  renderLoading() {
    const markup = Array(4)
      .fill(null)
      .map(() => {
        return `
            <div class="block w-full bg-white dark:bg-dark-blue overflow-hidden rounded-md shadow">
                <div class="animate-pulse w-full h-40 bg-gray-200 dark:bg-slate-600 object-cover"></div>
                <div class="animate-pulse flex flex-col gap-y-4 pl-6 pt-6 pb-10">
                    <div class="h-6 w-1/3 bg-gray-200 dark:bg-slate-600"></div>
                    <div class="space-y-2">
                        <div class="h-4 w-2/3 bg-gray-200 dark:bg-slate-600"></div>
                        <div class="h-4 w-1/2 bg-gray-200 dark:bg-slate-600"></div>
                        <div class="h-4 w-1/3 bg-gray-200 dark:bg-slate-600"></div>
                    </div>
                </div>
            </div>
        `
      })
      .join('')

    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  _generateMarkup() {
    // prettier-ignore
    return this._data
        .map(country => {
            return `
                <a href="/country.html#${country.name}" class="block w-full bg-white dark:bg-dark-blue overflow-hidden rounded-md shadow">
                    <img class="w-full h-40 object-cover" src="${country.flag}" alt="Flag of ${country.name}">
                    <div class="flex flex-col gap-y-4 pl-6 pt-6 pb-10">
                        <h2 class="font-extrabold">${country.name}</h2>
                        <div class="text-sm font-semibold space-y-2">
                            <div>Population: <span class="font-light">${formatNums(country.population)}</span></div>
                            <div>Region: <span class="font-light">${country.region}</span></div>
                            <div>Capital: <span class="font-light">${convertArrToStr(country.capital)}</span></div>
                        </div>
                    </div>
                </a>
            `
        })
        .join('')
  }
}

export default new CountriesView()
