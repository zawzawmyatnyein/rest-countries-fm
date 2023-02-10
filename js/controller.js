import { randomItems } from './utilities'
import * as model from './model'
import countriesView from './views/countriesView'
import searchView from './views/searchView'
import filterView from './views/filterView'
import detailView from './views/detailView'
import themeTogglerView from './views/themeTogglerView'

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

const controlLoadCountryDetails = async function () {
  try {
    const hashValue = decodeURI(window.location.hash.slice(1))
    if (!hashValue) window.location.href = '/'

    detailView.renderLoading()

    if (hashValue.length === 3) {
      await model.getCountryByAlphaCode(hashValue)
    } else {
      await model.getCountryByName(hashValue)
    }

    detailView.render(model.state.country)
  } catch (err) {
    detailView.renderError()
  }
}

const controlLoadTheme = function () {
  model.getThemefromStorage()

  themeTogglerView.render(model.state.theme)
}

const controlSwitchTheme = function () {
  model.switchTheme()

  themeTogglerView.render(model.state.theme)
}

const controlChangeThemePreference = function (theme) {
  model.persistTheme(theme)

  themeTogglerView.render(theme)
}

const init = function () {
  themeTogglerView.addHandlerRenderTheme(controlLoadTheme)
  themeTogglerView.addHandlerToggleTheme(controlSwitchTheme)
  themeTogglerView.addHandlerChangeThemePreference(controlChangeThemePreference)
  countriesView.addHandlerRender(controlLoadCountries)
  searchView.addHanlderSearch(controlSearchCountries)
  filterView.addHandlerFilter(controlFilterCountries)
  detailView.addHandlerRender(controlLoadCountryDetails)
}
init()
