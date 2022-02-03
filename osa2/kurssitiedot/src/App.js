const Header = ({ courseName }) => (
  <div>
    <h2>{courseName}</h2>
  </div>
)

const Part = ({ name, exercises }) => (
  <div>
    <p>
      {name} {exercises}
    </p>
  </div>
)

const Content = ({ parts }) =>
  parts.map(part =>
    <Part key={part.id} name={part.name} exercises={part.exercises} />)

const Total = ({ parts }) => {
  const total = parts.reduce( (sum, part) => sum + part.exercises, 0 )
  return (
    <div>
      <b>
        Total of {total} exercises
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
  const courses = [
    {
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}

export default App