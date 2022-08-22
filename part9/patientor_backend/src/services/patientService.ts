import { v1 as uuid } from 'uuid';
import { toNewPatient } from '../utils';
import patientData from '../../data/patients';
import { Patient, PublicPatient, NewPatient, Entry, NewEntry } from '../types';

const patients: Array<Patient> = patientData.map(obj => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patientEntry: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...patientEntry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addEntry = (id: string, entry: NewEntry): Entry | undefined => {
  const patient = getPatient(id);
  if (!patient) {
    return;
  }
  const newEntry = {
    id: uuid(),
    ...entry
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  addPatient,
  getPatient,
  addEntry
};