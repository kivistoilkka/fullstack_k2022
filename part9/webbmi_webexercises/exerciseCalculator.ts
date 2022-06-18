interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (days: Array<number>, target: number): Result => {
    const periodLength = days.length;
    const trainingDays = days.filter((d) => d > 0).length;
    const average = days.reduce((sum, d) => sum + d, 0) / periodLength;
    const success = average >= target;

    const difference = target - average;
    let rating = -99;
    let ratingDescription = ''
    if (difference <= 0) {
        rating = 3;
        ratingDescription = 'target was reached, great work!'
    } else if (difference < target * 0.1) {
        rating = 2;
        ratingDescription = 'not too bad but could be better'
    } else {
        rating = 1;
        ratingDescription = 'there is much to improve'
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
