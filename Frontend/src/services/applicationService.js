import axios from "axios";
import { getToken } from "../utils/tokenManager";

const API_URL = import.meta.env.VITE_API_URL;

// Fetch applicants by job ID
export const fetchApplicantsByJob = (jobId) => {
  return axios.get(`${API_URL}/applications/job/${jobId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

// Update interview round and status for a specific applicant
export const updateInterviewRound = (applicantId, roundData) => {
  return axios.put(`${API_URL}/applications/${applicantId}/round`, roundData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

// Update candidate status
export const updateApplicationStatus = (applicationId, status) => {
  return axios.put(
    `${API_URL}/applications/${applicationId}`,
    { status },
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
};
