// services/patientService.ts
import axios from 'axios';
import { FetchPatientsResponse } from '../types';

const API_BASE_URL = 'https://localhost:7188/api/Patients';

export const getPatients = async (searchTerm: string, pageIndex: number, pageSize: number): Promise<FetchPatientsResponse> => {
  const response = await axios.post(`${API_BASE_URL}/GetPatients`, {
    searchTerm,
    pageIndex,
    pageSize,
  });
  return response.data;
};

export const deactivatePatient = async (patientId: string, inactiveReason: string): Promise<void> => {
  await axios.post(`${API_BASE_URL}/DeactivatePatient`, { patientId, inactiveReason });
};
