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

export default Course