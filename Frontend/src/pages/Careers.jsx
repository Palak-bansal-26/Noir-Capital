import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const jobs = [
  {
    title: "Cybersecurity Analyst",
    location: "Hyderabad | Bengaluru | Chennai | Mumbai",
    experience: "..",
    description: `We have an opportunity to shape your career and provide a journey where your passion for cybersecurity meets real-world impact...
    You will go through 3 rounds:
    1-Online Assessment
    2-Technical round(If you qualify assessment round)
    3-HR Round(If you qualify GD round)`,
  },
  {
    title: "Junior Software Engineer (Fresher)",
    location: "Hyderabad, Bengaluru, Chennai, Mumbai",
    experience: "..",
    description: `We are a fast-growing investment company passionate about building innovative software solutions...
    You will go through 3 rounds:
    1-Online Assessment
    2-Technical round(If you qualify assessment round).
    3-HR Round(If you qualify GD round)`,
  },
  {
    title: "Frontend Engineer (Fresher)",
    location: "Hyderabad | Bengaluru | Chennai | Mumbai",
    experience: "..",
    description: `As a Junior Software Engineer, you’ll be part of a fast-paced development team delivering innovative software solutions...
    You will go through 3 rounds:
    1-Online Assessment
    2-Technical round(If you qualify assessment round)
    3-HR Round(If you qualify GD round)`,
  },
];

const Careers = () => {
  const [openJob, setOpenJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const navigate = useNavigate();

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

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(submittedSearch.toLowerCase()) ||
      job.location.toLowerCase().includes(submittedSearch.toLowerCase())
  );

  return (
    <div className="service-card show px-4 md:px-10 py-6">
      <section className="services-hero mb-6">
        <h1 className="text-center text-white text-3xl font-bold mb-4">
          Join the Revolution at Noir Capital
        </h1>

        {/* 🔍 Search bar untouched */}
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

      {filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
          <div
            key={job.title}
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
                {(() => {
                  const parts = job.description.split(
                    "You will go through 3 rounds:"
                  );
                  const intro = parts[0]?.trim();
                  const steps = parts[1]
                    ? parts[1]
                        .split("\n")
                        .map((line) => line.trim())
                        .filter((line) => line !== "")
                    : [];

                  return (
                    <>
                      {intro && (
                        <p className="job-description mb-3 whitespace-pre-line leading-relaxed">
                          {intro}
                        </p>
                      )}

                      {steps.length > 0 && (
                        <div className="mb-4">
                          <p className="text-yellow-400 font-semibold mb-2">
                            You will go through 3 rounds:
                          </p>
                          <ol className="job-steps list-decimal list-inside pl-4">
                            {steps.map((step, idx) => (
                              <li key={idx}>{step.replace(/^\d-/, "").trim()}</li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </>
                  );
                })()}

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
