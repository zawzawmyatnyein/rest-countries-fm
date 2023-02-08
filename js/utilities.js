import { TIMEOUT_SEC } from './config'

const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${seconds} seconds`))
    }, seconds * 1000)
  })
}

export const fetchData = async function (url) {
  try {
    const fetchPro = fetch(url)

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
    const data = await res.json()

    if (!res.ok) {
      throw new Error(`${data.message} ${res.status}`)
    }

    return data
  } catch (err) {
    throw err
  }
}

export const randomItems = function (data, number) {
  const shuffledData = [...data].sort(() => 0.5 - Math.random())

  return shuffledData.slice(0, number)
}

export const formatNums = function (num) {
  return new Intl.NumberFormat(navigator.language, { maximumSignificantDigits: 3 }).format(num)
}

export const convertArrToStr = function (arr) {
  return [...arr].join(',')
}
