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

export default Content;