import React, { useEffect, useState } from "react";
import axios from "axios";
import ApplicationsList from "./ApplicationsList";

const HRDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("No authorization token found");
          setLoading(false);
          return;
        }

        const response = await axios.get(
  `${import.meta.env.VITE_APPLICATION_API_URL}/all`,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);
        // Handle response format
        const appsArray = Array.isArray(response.data)
          ? response.data
          : response.data.applications || [];

        setApplications(appsArray);
      } catch (error) {
        console.error("Error fetching applications:", error.response || error);
        alert(
          error.response?.data?.message ||
            "Failed to fetch applications from backend"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>HR Dashboard</h1>
      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p>No applications found</p>
      ) : (
        <ApplicationsList applications={applications} />
      )}
    </div>
  );
};

export default HRDashboard;
