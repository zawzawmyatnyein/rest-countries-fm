import { randomItems } from './utilities'
import * as model from './model'
import countriesView from './views/countriesView'
import searchView from './views/searchView'
import filterView from './views/filterView'

const controlLoadCountries = async function () {
  try {
    countriesView.renderLoading()

    await model.getCountries()

    countriesView.render(randomItems(model.state.search.results, 8))
  } catch (err) {
    countriesView.renderError('Cannot load the countries! Please try again later')
  }
}

const controlSearchCountries = async function () {
  try {
    countriesView.renderLoading()

    const query = searchView.getQuery()
    if (!query) return

    await model.getCountries(query)

    countriesView.render(model.state.search.results)
  } catch (err) {
    countriesView.renderError()
  }
}

const controlFilterCountries = async function () {
  try {
    countriesView.renderLoading()

    const query = filterView.getQuery()

    await model.getCountriesByRegion(query)

    countriesView.render(model.state.search.results)
  } catch (err) {
    countriesView.renderError('Cannot filter the countries by region! Please try again later')
  }
}

const init = function () {
  countriesView.addHandlerRender(controlLoadCountries)
  searchView.addHanlderSearch(controlSearchCountries)
  filterView.addHandlerFilter(controlFilterCountries)
}
init()
