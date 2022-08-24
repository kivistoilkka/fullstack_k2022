"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
const patients_1 = __importDefault(require("../../data/patients"));
const patients = patients_1.default.map(obj => {
    const object = (0, utils_1.toNewPatient)(obj);
    object.id = obj.id;
    return object;
});
const getPatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatient = (patientEntry) => {
    const newPatientEntry = Object.assign({ id: (0, uuid_1.v1)() }, patientEntry);
    patients.push(newPatientEntry);
    return newPatientEntry;
};
const getPatient = (id) => {
    const patient = patients.find(p => p.id === id);
    return patient;
};
const addEntry = (id, entry) => {
    const patient = getPatient(id);
    if (!patient) {
        return;
    }
    const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patient.entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getPatients,
    addPatient,
    getPatient,
    addEntry
};
