const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>;
};

interface CourseProps {
  parts: { name: string, exerciseCount: number }[];
};

const Content = ({ parts }: CourseProps) => {
  return (
    <div>
      {parts.map(({ name, exerciseCount}: { name: string, exerciseCount: number }) => {
        return (
          <p key={name}>
            {name} {exerciseCount}
          </p>
        )
      })}
    </div>
  );
};

const Total = ({ parts }: CourseProps) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};


const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;