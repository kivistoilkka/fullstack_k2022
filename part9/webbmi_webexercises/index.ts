import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import express from 'express';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
      const bmi = calculateBmi(Number(height), Number(weight));
      res.send({ weight, height, bmi });
    } else {
      res.status(400).send({ error: 'malformatted parameters'});
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message});
    } else {
      res.status(500).send({ error: 'Something went wrong.'});
    }
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  if (isNaN(Number(target))) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  if (daily_exercises instanceof Array) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (daily_exercises.length === 0 || daily_exercises.some(d => isNaN(d))) {
      return res.status(400).send({ error: 'malformatted parameters' });
    }
  } else {
    return res.status(400).send({ error: 'malformatted parameters' });
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, target);
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
