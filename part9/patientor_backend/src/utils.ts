import { NewPatient, Gender, Entry, EntryType } from "./types";

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
const isEntry = (object: any): object is Entry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(object.type);
};

const isEntryArray = (array: unknown[]): array is Entry[] => {
  return array.every(object => isEntry(object));
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !(entries instanceof Array) || !isEntryArray(entries)) {
    throw new Error('Incorrect or missing entries: ' + entries);
  }
  return entries;
};

const toNewPatient = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { name, dateOfBirth, ssn, gender, occupation, entries }: any
): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries)
  };
  
  return newEntry;
};

export default toNewPatient;