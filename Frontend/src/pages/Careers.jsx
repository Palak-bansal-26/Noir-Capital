import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Careers = () => {
  const [openJob, setOpenJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [jobs, setJobs] = useState([]);       // jobs from DB
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch jobs from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, []);

  const toggleDescription = (jobTitle) => {
    setOpenJob(openJob === jobTitle ? null : jobTitle);
  };

  const handleApplyClick = (jobTitle) => {
    navigate(`/apply/${encodeURIComponent(jobTitle)}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSubmittedSearch(searchTerm);
  };
  
const filteredJobs = Array.isArray(jobs)
  ? jobs.filter(
      (job) =>
        job?.title?.toLowerCase().includes(submittedSearch.toLowerCase()) ||
        job?.location?.toLowerCase().includes(submittedSearch.toLowerCase())
    )
  : [];


  return (
    <div className="service-card show px-4 md:px-10 py-6">
      <section className="services-hero mb-6">
        <h1 className="text-center text-white text-3xl font-bold mb-4">
          Join the Revolution at Noir Capital
        </h1>

        {/* 🔍 Search bar */}
        <div className="search-bar-container">
          <form onSubmit={handleSearch} className="search-bar">
            <input
              type="text"
              placeholder="🔍 Search jobs by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </section>

      {loading ? (
        <p className="text-[#ccc]">Loading jobs...</p>
      ) : filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
          <div
            key={job._id}
            className="service-card show mb-6 border-b border-gray-700 pb-4"
          >
            <h2
              className="text-xl font-semibold mb-2 text-white cursor-pointer"
              onClick={() => toggleDescription(job.title)}
            >
              {job.title}
            </h2>

            <p className="text-sm text-[#ccc] mb-1">📍 {job.location}</p>

            {openJob === job.title && (
              <>
                <div className="border-t border-yellow-600 my-3"></div>

                <p className="job-description mb-3 whitespace-pre-line leading-relaxed">
                  {job.description}
                </p>

                <button
                  className="bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black border border-white transition duration-300"
                  onClick={() => handleApplyClick(job.title)}
                >
                  Apply Now
                </button>
              </>
            )}
          </div>
        ))
      ) : (
        <p className="text-[#ccc]">No jobs found.</p>
      )}
    </div>
  );
};

export default Careers;
