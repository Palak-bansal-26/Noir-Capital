import axios from 'axios';
import { getToken } from '../utils/tokenManager';

const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL → ", API_URL);

// ---------------- AUTH APIS ----------------
export const loginUser = (credentials) => axios.post(`${API_URL}/login`, credentials);

export const registerUser = (userData) => axios.post(`${API_URL}/register`, userData);

export const fetchUserProfile = (token = null) =>
  axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token || getToken()}` },
  });

export const getGoogleAuthUrl = () => `${API_URL}/google`;

export const setPassword = (password) => {
  return axios.post(
    `${API_URL}/set-password`,
    { password },
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
};

// ---------------- APPLICATION APIS ----------------

// ✅ Get all job applications (for HR dashboard)
export const fetchJobApplications = () =>
  axios.get(`${API_URL}/applications`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

// ✅ Fetch applicants by Job ID
export const fetchApplicantsByJob = (jobId) =>
  axios.get(`${API_URL}/applications/job/${jobId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

// ✅ Update candidate status
export const updateApplicationStatus = (applicationId, status) =>
  axios.put(
    `${API_URL}/applications/${applicationId}`,
    { status },
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );

// ✅ Update interview round for a specific applicant
export const updateInterviewRound = (applicantId, roundData) =>
  axios.put(`${API_URL}/applications/${applicantId}/round`, roundData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
