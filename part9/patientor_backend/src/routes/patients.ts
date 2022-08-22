import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatient(id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).end();
  }
});

router.post('/:id/entries', (req, res) => {
  const patientId = req.params.id;
  const newEntry = toNewEntry(req.body);
  const addedEntry = patientService.addEntry(patientId, newEntry);
  if (addedEntry) {
    res.send(addedEntry);
  } else {
    res.status(404).end();
  }
});

export default router;