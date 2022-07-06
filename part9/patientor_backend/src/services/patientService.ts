import patientData from '../../data/patients.json';

import { Patient, PatientWithoutSSN } from '../types';

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

export default {
  getPatients
};