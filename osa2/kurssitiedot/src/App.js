const Header = ({ courseName }) => (
  <div>
    <h1>{courseName}</h1>
  </div>
)

const Part = ({ name, exercises }) => (
  <div>
    <p>
      {name} {exercises}
    </p>
  </div>
)

const Content = ({ parts }) => {
  return (parts
    .map(part =>
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    )
  )
}

const Total = ({ parts }) => {
  const calcSum = (table) => {
    let sum  = 0
    for (let i = 0; i < table.length; i++) {
      sum += table[i].exercises
    }
    return sum
  }
  return (
    <div>
      <b>
        Total of {calcSum(parts)} exercises
      </b>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App