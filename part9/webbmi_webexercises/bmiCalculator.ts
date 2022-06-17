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

try {
    console.log(calculateBmi(180, 74));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message
    }
    console.log(errorMessage);
}