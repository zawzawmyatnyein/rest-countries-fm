import { API_URL } from './config'
import { fetchData } from './utilities'

export const state = {
  theme: 'light',
  search: {
    query: '',
    results: [],
  },
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
