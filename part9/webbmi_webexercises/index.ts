import { calculateBmi } from './bmiCalculator';
import express from 'express';
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
