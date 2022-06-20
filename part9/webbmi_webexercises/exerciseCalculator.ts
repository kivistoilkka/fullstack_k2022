interface ExerciseValues {
  days: Array<number>;
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
  const days = args.slice(3).map(d => Number(d));
  const nonNumberDayInArray = days.some(d => isNaN(d));

  if (!isNaN(target) && !nonNumberDayInArray) {
    return {
      target,
      days
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateExercises = (days: Array<number>, target: number): Result => {
  const periodLength = days.length;
  const trainingDays = days.filter((d) => d > 0).length;
  const average = days.reduce((sum, d) => sum + d, 0) / periodLength;
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
    ratingDescription = 'there is much to improve';
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


try {
  const { target, days } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(days, target));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
