import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filterName, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={filterName} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = (props) => {
  const { addPerson, newName, handleNameChange, newNumber, handleNumberChange} = props
  return (
    <form onSubmit={addPerson}>
    <div>name: <input value={newName} onChange={handleNameChange} /></div>
    <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
    <div><button type="submit">add</button></div>
  </form>
  )
}

const Person = ({ person }) =>
  <div>
    {person.name} {person.number}
  </div>

const Persons = ({ personsToShow }) =>
  personsToShow.map(person =>
    <Person key={person.name} person={person} />
  )

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleFilterChange = (event) => setFilterName(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map((person) => person.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  )
  
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm addPerson={addPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App