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

/*const Total = (props) => (
  <div>
    <p>Number of exercises {props.parts[0].exercises
      + props.parts[1].exercises
      + props.parts[2].exercises}
    </p>
  </div>
)*/

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
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