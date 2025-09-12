import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from '../App';
import { setPassword } from "../services/authService";
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import '../styles/SetPasswordPage.css'; // Make sure this CSS file is created

// --- Helper component for Password Strength ---
const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let score = 0;
    if (!pass) return score;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getStrength(password);
  const strengthLabels = ["", "Weak", "Medium", "Good", "Strong"];
  const strengthColors = ["", "bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];

  return (
    <div className="password-strength-container">
      <div className="password-strength-meter">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`strength-bar ${index < strength ? strengthColors[strength] : 'bg-gray-300'}`}
          ></div>
        ))}
      </div>
      <span className="strength-label">{strengthLabels[strength]}</span>
    </div>
  );
};


const SetPasswordPage = () => {
  const [password, setPasswordValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Authentication token not found. Please try logging in again.");
      return;
    }
    setLoading(true);
    setMsg("");
    setError("");

    try {
      await login(token);
      await setPassword(password);
      setMsg("✅ Password set successfully! Redirecting...");
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to set password");
      setLoading(false);
    }
  };

  return (
    <div className="set-password-container">
      <div className="set-password-card">
        <div className="card-header">
          <div className="lock-icon-wrapper">
            <AiOutlineLock className="lock-icon" />
          </div>
          <h2 className="set-password-title">Set a Secure Password</h2>
          <p className="set-password-subtext">This will be used for all future logins.</p>
        </div>

        <form onSubmit={handleSubmit} className="set-password-form">
          <div className="input-group">
            <div className="password-input-wrapper">
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="set-password-input"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPasswordValue(e.target.value)}
                required
                minLength={6}
              />
              <span 
                className="password-toggle-icon" 
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            <PasswordStrengthMeter password={password} />
          </div>

          <button
            type="submit"
            disabled={loading || !token}
            className="set-password-button"
          >
            {loading ? "Saving..." : "Save Password & Sign In"}
          </button>
        </form>

        {msg && <p className="feedback-msg success-msg">{msg}</p>}
        {error && <p className="feedback-msg error-msg">{error}</p>}
      </div>
    </div>
  );
};

export default SetPasswordPage;
