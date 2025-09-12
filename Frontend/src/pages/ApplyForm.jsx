import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ApplyForm = () => {
  const { jobTitle } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    qualification: "",
    resume: null,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // token stored when user logs in
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You need to be logged in to apply.");
    return;
  }

  const formDataToSend = new FormData();
  formDataToSend.append("jobTitle", decodeURIComponent(jobTitle)); // or jobId if you prefer
  formDataToSend.append("qualification", formData.qualification);
  formDataToSend.append("resume", formData.resume);

  try {
    const response = await fetch("http://localhost:5000/api/applications", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataToSend,
    });

    if (response.ok) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setFormData({ name: "", mobile: "", email: "", qualification: "", resume: null });
    } else {
      const errorBody = await response.json().catch(() => ({}));
      console.error("Failed to submit application:", errorBody);
      alert(errorBody.message || "Failed to submit application");
    }
  } catch (err) {
    console.error("Network error:", err);
    alert("Network error while submitting application");
  }
};


  return (
    <div className="apply-form-container">
      <style>{`
        .apply-form-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #111827;
          padding: 20px;
          font-family: Arial, sans-serif;
          position: relative;
        }
        .apply-form-card {
          background: #1f2937;
          padding: 30px;
          border-radius: 12px;
          max-width: 450px;
          width: 100%;
          box-shadow: 0 6px 15px rgba(0,0,0,0.4);
        }
        .apply-form-title {
          font-size: 1.8rem;
          font-weight: bold;
          color: #ffffff;
          text-align: center;
          margin-bottom: 20px;
        }
        .apply-form-title span {
          color: #facc15;
        }
        .apply-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .apply-form label {
          display: block;
          font-size: 0.95rem;
          margin-bottom: 6px;
          color: #e5e7eb;
        }
        .apply-form input,
        .apply-form select {
          width: 100%;
          padding: 10px 12px;
          border-radius: 6px;
          border: 1px solid #d1d5db;
          font-size: 0.95rem;
          outline: none;
          transition: border 0.3s, box-shadow 0.3s;
        }
        .apply-form input:focus,
        .apply-form select:focus {
          border-color: #facc15;
          box-shadow: 0 0 5px #facc15;
        }
        .apply-form input[type="file"] {
          background: #ffffff;
          cursor: pointer;
          padding: 8px;
        }
        .apply-form button {
          background-color: #facc15;
          color: #111827;
          font-weight: bold;
          padding: 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.3s;
        }
        .apply-form button:hover {
          background-color: #eab308;
        }

        /* Success Popup */
        .success-popup {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #22c55e;
          color: white;
          padding: 12px 20px;
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          animation: fadeInOut 3s ease forwards;
          font-weight: bold;
        }

        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-20px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
      `}</style>

      {/* Success Popup */}
      {showSuccess && (
        <div className="success-popup">✅ Application submitted successfully!</div>
      )}

      <div className="apply-form-card">
        <h1 className="apply-form-title">
          Apply for <span>{decodeURIComponent(jobTitle)}</span>
        </h1>

        <form onSubmit={handleSubmit} className="apply-form">
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              pattern="[0-9]{10}"
              maxLength="10"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Highest Qualification</label>
            <select
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
            >
              <option value="">-- Select --</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="Diploma">Diploma</option>
              <option value="Graduation">Graduation</option>
              <option value="Post Graduation">Post Graduation</option>
            </select>
          </div>

          <div>
            <label>Upload Resume</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
            />
          </div>

          <button type="submit">Submit Application</button>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
