// Job Roles API service
import axios from 'axios';

const API_BASE = '/api/job-roles';

export const fetchJobRoles = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const createJobRole = async (data) => {
  const res = await axios.post(API_BASE, data);
  return res.data;
};

export const updateJobRole = async (id, data) => {
  const res = await axios.put(`${API_BASE}/${id}`, data);
  return res.data;
};

export const deleteJobRole = async (id) => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};
