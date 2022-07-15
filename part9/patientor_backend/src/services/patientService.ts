import { v1 as uuid } from 'uuid';

import patientData from '../../data/patients.json';

import { Patient, PatientWithoutSSN, NewPatient } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): PatientWithoutSSN[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  addPatient
};