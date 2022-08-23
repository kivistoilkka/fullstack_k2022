import {
  NewPatient,
  NewEntry,
  Gender,
  Entry,
  EntryType,
  HealthCheckRating,
  SickLeave,
  Discharge
} from "./types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  const re = /^\d{4}-\d{2}-\d{2}$/;
  if (!date || !isString(date) || !isDate(date) || !re.test(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (type: any): type is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(type);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (object: any): object is Entry => {
  return isEntryType(object.type);
};

const isEntryArray = (array: unknown[]): array is Entry[] => {
  return array.every(object => isEntry(object));
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !(entries instanceof Array) || !isEntryArray(entries)) {
    if (!entries) {
      return new Array<Entry>;
    }
    throw new Error('Incorrect or missing entries: ' + entries);
  }
  return entries;
};

export const toNewPatient = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { name, dateOfBirth, ssn, gender, occupation, entries }: any
): NewPatient => {
  const newPatientEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries)
  };
  
  return newPatientEntry;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const isDiagnoseCodeArray = (array: unknown[]): array is string[] => {
  return array.every(entry => isString(entry));
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] => {
  if (!(diagnosisCodes instanceof Array) || !isDiagnoseCodeArray(diagnosisCodes)) {
    throw new Error('Incorrect diagnosis codes: ' + diagnosisCodes);
  }
  return diagnosisCodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating === undefined || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing health check rating: ' + rating);
  }
  return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (object: any): object is SickLeave => {
  if (
    !object.startDate ||
    !parseDate(object.startDate) ||
    !object.endDate ||
    !parseDate(object.endDate)
  ) {
    return false;
  }
  return true;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sick leave: ' + sickLeave);
  }
  return sickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (object: any): object is Discharge => {
  if (
    !object.date ||
    !parseDate(object.date) ||
    !object.criteria ||
    !isString(object.criteria)
  ) {
    return false;
  }
  return true;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }
  return discharge;
};

export const toNewEntry = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { type, description, date, specialist, diagnosisCodes, healthCheckRating, employerName, sickLeave, discharge }: any
): NewEntry => {
  if (!type || !isEntryType(type)) {
    throw new Error('Incorrect or missing entry type: ' + type);
  }

  switch (type) {
    case EntryType.HealthCheck:
      const healthCheckEntry: NewEntry = {
        type,
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      };
      if (diagnosisCodes) {
        healthCheckEntry.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
      }
      return healthCheckEntry;

    case EntryType.OccupationalHealthcare:
      const occupationalHealthcareEntry: NewEntry = {
        type,
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        employerName: parseName(employerName)
      };
      if (diagnosisCodes) {
        occupationalHealthcareEntry.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
      }
      if (sickLeave) {
        occupationalHealthcareEntry.sickLeave = parseSickLeave(sickLeave);
      }
      return occupationalHealthcareEntry;

    case EntryType.Hospital:
      const hospitalEntry: NewEntry = {
        type,
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        discharge: parseDischarge(discharge)
      };
      if (diagnosisCodes) {
        hospitalEntry.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
      }
      return hospitalEntry;

    default:
      return assertNever(type);
  }
};