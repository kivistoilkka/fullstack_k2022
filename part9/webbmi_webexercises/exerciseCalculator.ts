interface ExerciseValues {
  dailyExercises: Array<number>;
  target: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const target = Number(args[2]);
  const dailyExercises = args.slice(3).map(d => Number(d));
  const nonNumberDayInArray = dailyExercises.some(d => isNaN(d));

  if (!isNaN(target) && !nonNumberDayInArray) {
    return {
      target,
      dailyExercises
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateExercises = (dailyExercises: Array<number>, target: number): Result => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter((d) => d > 0).length;
  const average = dailyExercises.reduce((sum, d) => sum + d, 0) / periodLength;
  const success = average >= target;

  const difference = target - average;
  let rating = -99;
  let ratingDescription = '';
  if (difference <= 0) {
    rating = 3;
    ratingDescription = 'target was reached, great work!';
  } else if (difference < target * 0.2) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'bad';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

if (require.main === module) {
  try {
    const { target, dailyExercises } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(dailyExercises, target));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}

export { calculateExercises };