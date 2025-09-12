import React, { useState } from "react";
import { Link } from "react-router-dom";

<Link to={`/apply/${encodeURIComponent(job.title)}`}>
  <button className="bg-yellow-500 text-black font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-yellow-400">
    Apply Now
  </button>
</Link>

const ApplyButton = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="mt-10 flex justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Join Our Team 🚀
        </h2>
        <p className="text-gray-600 mb-6">
          We’re always looking for passionate people.  
          Apply now and take the next step in your career.
        </p>

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-700 transition duration-300 w-full"
          >
            Apply Now
          </button>
        ) : (
          <div className="mt-6">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSeJnF8Tmk3aFnRvvBWHahIvWsp74_7PRGeG7aDGeFhdOjha7A/viewform?embedded=true"
              width="100%"
              height="650"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              className="rounded-lg shadow-md"
              title="Application Form"
            >
              Loading…
            </iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyButton;
