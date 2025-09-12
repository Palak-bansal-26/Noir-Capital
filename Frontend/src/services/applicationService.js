import axios from "axios";
import { getToken } from "../utils/tokenManager";

const API_URL = import.meta.env.VITE_API_URL;

// Fetch applicants by job ID
export const fetchApplicantsByJob = async (jobId) => {
  try {
    console.log("Fetching applications for jobId:", jobId); // ✅ Step 3 logging
    const response = await axios.get(
      `${import.meta.env.VITE_APPLICATION_API_URL}/job/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data.applications || []; // always return array
  } catch (error) {
    console.error("Failed to fetch applications:", error.response || error); // logging
    return []; // fallback to empty array
  }
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
