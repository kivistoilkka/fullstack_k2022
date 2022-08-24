"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatient = void 0;
const types_1 = require("./types");
const assertNever = (value) => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    const re = /^\d{4}-\d{2}-\d{2}$/;
    if (!date || !isString(date) || !isDate(date) || !re.test(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (type) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.EntryType).includes(type);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (object) => {
    return isEntryType(object.type);
};
const isEntryArray = (array) => {
    return array.every(object => isEntry(object));
};
const parseEntries = (entries) => {
    if (!entries || !(entries instanceof Array) || !isEntryArray(entries)) {
        if (!entries) {
            return new Array;
        }
        throw new Error('Incorrect or missing entries: ' + entries);
    }
    return entries;
};
const toNewPatient = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
{ name, dateOfBirth, ssn, gender, occupation, entries }) => {
    const newPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: parseEntries(entries)
    };
    return newPatientEntry;
};
exports.toNewPatient = toNewPatient;
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }
    return description;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist: ' + specialist);
    }
    return specialist;
};
const isDiagnoseCodeArray = (array) => {
    return array.every(entry => isString(entry));
};
const parseDiagnosisCodes = (diagnosisCodes) => {
    if (!(diagnosisCodes instanceof Array) || !isDiagnoseCodeArray(diagnosisCodes)) {
        throw new Error('Incorrect diagnosis codes: ' + diagnosisCodes);
    }
    return diagnosisCodes;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseHealthCheckRating = (rating) => {
    if (!rating === undefined || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect or missing health check rating: ' + rating);
    }
    return rating;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (object) => {
    if (!object.startDate ||
        !parseDate(object.startDate) ||
        !object.endDate ||
        !parseDate(object.endDate)) {
        return false;
    }
    return true;
};
const parseSickLeave = (sickLeave) => {
    if (!sickLeave || !isSickLeave(sickLeave)) {
        throw new Error('Incorrect or missing sick leave: ' + sickLeave);
    }
    return sickLeave;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (object) => {
    if (!object.date ||
        !parseDate(object.date) ||
        !object.criteria ||
        !isString(object.criteria)) {
        return false;
    }
    return true;
};
const parseDischarge = (discharge) => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }
    return discharge;
};
const toNewEntry = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
{ type, description, date, specialist, diagnosisCodes, healthCheckRating, employerName, sickLeave, discharge }) => {
    if (!type || !isEntryType(type)) {
        throw new Error('Incorrect or missing entry type: ' + type);
    }
    switch (type) {
        case types_1.EntryType.HealthCheck:
            const healthCheckEntry = {
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
        case types_1.EntryType.OccupationalHealthcare:
            const occupationalHealthcareEntry = {
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
        case types_1.EntryType.Hospital:
            const hospitalEntry = {
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
exports.toNewEntry = toNewEntry;
