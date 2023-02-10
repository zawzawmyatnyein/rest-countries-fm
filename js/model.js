import { API_URL } from './config'
import { fetchData } from './utilities'

export const state = {
  theme: 'light',
  country: {},
  search: {
    query: '',
    results: [],
  },
}

const createCountryObj = function (data) {
  const country = data[0]

  const { name, population, region, subregion, capital, tld, languages, currencies, borders, flags } = country

  return {
    officialName: name.official,
    nativeName: name.nativeName[Object.keys(name.nativeName)[0]].common,
    population: population,
    region: region,
    subregion: subregion,
    capital: capital ? [...capital] : '',
    tld: [...tld],
    languages: Object.values(languages),
    currencies: Object.values(currencies)[0],
    borderCountries: borders ? [...borders] : '',
    flag: flags.svg,
  }
}

const createCountriesArr = function (data) {
  return data.map(country => {
    const { name, population, region, capital, flags } = country
    return {
      name: name.official,
      population: population,
      region: region,
      capital: capital ? [...capital] : '',
      flag: flags.svg,
    }
  })
}

export const getCountryByName = async function (name) {
  try {
    const data = await fetchData(`${API_URL}/name/${name}`)

    state.country = createCountryObj(data)
  } catch (err) {
    throw err
  }
}

export const getCountryByAlphaCode = async function (code) {
  try {
    const data = await fetchData(`${API_URL}/alpha/${code}`)

    state.country = createCountryObj(data)
  } catch (err) {
    throw err
  }
}

export const getCountries = async function (query = '') {
  try {
    state.search.query = query

    const data = await fetchData(!query ? `${API_URL}/all` : `${API_URL}/name/${query}`)

    state.search.results = createCountriesArr(data)
  } catch (err) {
    throw err
  }
}

export const getCountriesByRegion = async function (region = '') {
  try {
    state.search.query = region

    const data = await fetchData(!region ? `${API_URL}/all` : `${API_URL}/region/${region}`)

    state.search.results = createCountriesArr(data)
  } catch (err) {
    throw err
  }
}

export const getThemefromStorage = function () {
  if (localStorage.theme) state.theme = localStorage.theme
}

export const switchTheme = function () {
  if (state.theme === 'light') {
    return persistTheme('dark')
  }
  persistTheme('light')
}

export const persistTheme = function (theme) {
  state.theme = theme
  localStorage.theme = theme
}
