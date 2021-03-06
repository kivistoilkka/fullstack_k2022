import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message, errorState }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const errorStyle = { ...notificationStyle, color: 'red' }

  if (message === null) {
    return null
  }
  if (errorState) {
    return (
      <div style={errorStyle}>
        {message}
      </div>
    )
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

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

const Person = ({ person, deletePerson }) =>
  <div>
    {person.name} {person.number} <button onClick={() => deletePerson(person)}>
      delete
    </button>
  </div>

const Persons = ({ personsToShow, deletePerson }) =>
  personsToShow.map(person =>
    <Person key={person.name} person={person} deletePerson={deletePerson} />
  )

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)
  const [errorState, setErrorState] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleFilterChange = (event) => setFilterName(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map((person) => person.name).includes(newName)) {
      const person = persons.find(p => p.name === newName)
      const message = `${person.name} is already added to phonebook, replace the old number with a new one?`
      if (window.confirm(message)) {
        updatePerson(person, newNumber)
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)){
      personService
        .remove(person.id)
        .then(() => {
          setMessage(`Removed ${person.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          alert(
          `${person.name} was already deleted from server`
          )
        })
      setPersons(persons.filter(p => p.id !== person.id))
    }
  }

  const updatePerson = (person, newNumber) => {
    const changedPerson = { ...person, number: newNumber }
    personService
      .update(changedPerson.id, changedPerson)
      .then(returnedPerson => {
        setMessage(`Updated ${returnedPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setErrorState(true)
        setMessage(`${person.name} was already deleted from server`)
        setTimeout(() => {
          setMessage(null)
          setErrorState(false)
        }, 5000)
        setPersons(persons.filter(p => p.id !== person.id))
      })
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  )
  
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} errorState={errorState} />

      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm addPerson={addPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App