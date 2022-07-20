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

interface CourseSpecialPart extends CoursePartDescription {
  type: "special";
  requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>;
};

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  
  switch (part.type) {
    case "normal":
      return (<p key={part.name}>
        <b>{part.name} {part.exerciseCount}</b><br />
        <i>{part.description}</i>
      </p>)
    case "groupProject":
      return (<p key={part.name}>
        <b>{part.name} {part.exerciseCount}</b><br />
        project exercises {part.groupProjectCount}
      </p>)
    case "submission":
      return (<p key={part.name}>
        <b>{part.name} {part.exerciseCount}</b><br />
        <i>{part.description}</i><br />
        submit to {part.exerciseSubmissionLink}
      </p>)
    case "special":
      return (<p key={part.name}>
        <b>{part.name} {part.exerciseCount}</b><br />
        <i>{part.description}</i><br />
        required skills: {part.requirements.join(', ')}
      </p>)
    default:
      return assertNever(part);
  }
};

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((part: CoursePart) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

const Total = ({ parts }: { parts: CoursePart[] }) => {
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
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
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