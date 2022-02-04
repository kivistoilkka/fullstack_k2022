import { useState } from 'react'

const Filter = ({ filterName, setFilterName }) => {
  const handleFilterChange = (event) => setFilterName(event.target.value)
  return (
    <div>
      filter shown with <input value={filterName} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = (props) => {
  const { persons, setPersons, newName, setNewName, newNumber, setNewNumber } = props
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
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  )
  
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterName={filterName} setFilterName={setFilterName} />

      <h3>Add a new</h3>

      <PersonForm persons={persons} setPersons={setPersons}
        newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber}
      />
      
      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App