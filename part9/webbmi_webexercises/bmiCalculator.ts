interface BmiValues {
    height: number;
    weight: number;
}

const parseBmiArguments = (args: Array<string>): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
    const height = Number(args[2]);
    const weight = Number(args[3]);

    if (!isNaN(height) && !isNaN(weight)) {
        return {
            height,
            weight
        }
    } else {
        throw new Error('Provided values were not numbers!')
    }
}

const calculateBmi = (height: number, weight: number) : string => {
    if (height === 0) throw new Error('Can\'t divide by 0!')
    const bmi = weight / ((height/100) ** 2);
    if (bmi < 18.5) {
        return "Underweight"
    } else if (bmi < 25) {
        return "Normal (healthy weight)"
    } else if (bmi < 30) {
        return "Overweight"
    } else {
        return "Obese"
    }
}

if (require.main === module) {
    try {
        const { height, weight } = parseBmiArguments(process.argv);
        console.log(calculateBmi(height, weight));
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.'
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message
        }
        console.log(errorMessage);
    }
}

export { calculateBmi };