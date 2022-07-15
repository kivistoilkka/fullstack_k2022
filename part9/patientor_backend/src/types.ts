export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Other = 'other',
  Female = 'female',
  Male = 'male',
}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};

export type PatientWithoutSSN = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;