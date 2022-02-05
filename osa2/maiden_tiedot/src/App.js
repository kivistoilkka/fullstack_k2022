import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryFilter = ({ nameFilter, handleNameFilter }) => {
  return (
    <div>
      find countries
      <input value={nameFilter} onChange={handleNameFilter} />
    </div>
  )
}

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      capital {country.capital}<br />
      area {country.area}
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(language =>
          <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png}
        alt={`flag of ${country.name.common}`}
        width="20%" height="20%" />
    </div>
  )
}

const ShowCountries = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />
  }

  if (countries.length === 0) {
    return(
      <div>No matches, specify another filter</div>
    )
  }

  return (
    <div>
      {countries
        .map(country =>
          <div key={country.cca2}>
            {country.name.common}
          </div>)}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      //.get('http://localhost:3001/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const handleNameFilter = (event) => setNameFilter(event.target.value)

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(nameFilter.toLowerCase())
    )

  return (
    <div>
      <CountryFilter nameFilter={nameFilter} handleNameFilter={handleNameFilter} />
      <ShowCountries countries={countriesToShow} />
    </div>
  )
}

export default App