interface CourseProps {
  parts: { name: string, exerciseCount: number }[];
}

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

export default Total;