interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartDescription {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>;
};

interface CourseProps {
  parts: { name: string, exerciseCount: number }[];
}

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
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
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