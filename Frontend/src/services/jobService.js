import axios from "axios";
import { getToken } from "../utils/tokenManager";

const JOB_API_URL = import.meta.env.VITE_JOB_API_URL + "/jobs";

export const getJobs = async () => {
  const token = getToken(); // optional if your route is protected
  const response = await axios.get(JOB_API_URL, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data; // will return { jobs: [...] }
};

export const getJobById = async (jobId) => {
  const token = getToken();
  const response = await axios.get(`${JOB_API_URL}/${jobId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
