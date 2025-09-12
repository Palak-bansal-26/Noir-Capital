import React, { useState } from "react";
import InputField from "./InputField";
import GoogleIcon from "./GoogleIcon";
import { fetchUserProfile } from "../services/authService";
import {
  loginUser,
  registerUser,
  getGoogleAuthUrl,
} from "../services/authService";

const AuthForm = ({ onAuthSuccess, userType }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { name, email, password, phoneNumber } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleGoogleLogin = () => (window.location.href = getGoogleAuthUrl());

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let res;
      if (isLogin) {
        res = await loginUser({ email, password });
      } else {
        res = await registerUser({ name, email, password, phoneNumber });
      }

      const token = res.data.token;
      const profileRes = await fetchUserProfile(token);
      const actualRole = profileRes.data.data.role;

      // Check if the logged-in role matches the portal
      if (userType !== actualRole) {
        localStorage.removeItem("token");
        setError(
          `You are not authorized to log in via the ${userType} portal.`
        );
        return;
      }

      // Successful auth
      localStorage.setItem("token", token);
      onAuthSuccess(token);
    } catch (err) {
      localStorage.removeItem("token");
      const backendMsg =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "An error occurred.";
      setError(backendMsg);
    } finally {
      setLoading(false);
    }
  };

  const isClientRegistration = userType === "user" && !isLogin;

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        {userType === "admin"
          ? "Admin Secure Login"
          : isLogin
          ? "User Login"
          : "Create Your Account"}
      </h2>
      {error && (
        <p className="bg-red-900/50 border border-red-700 text-red-300 text-center p-3 rounded-lg mb-6 text-sm">
          {error}
        </p>
      )}
      <form onSubmit={onSubmit} className="space-y-6">
        {isClientRegistration && (
          <InputField
            label="Full Name"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
            placeholder="Enter your Full Name"
          />
        )}
        <InputField
          label="Email Address"
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          required
          placeholder="Enter your Email ID"
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          required
          placeholder="Minimum 6 length Strong Password"
        />
        {isClientRegistration && (
          <InputField
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            onChange={onChange}
            required
            placeholder="Enter your 10 digit Phone Number"
          />
        )}

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
        </button>
      </form>

      {userType === "user" && (
        <>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#1c1c1c] text-gray-500">Or</span>
            </div>
          </div>


          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2.5 px-4 rounded-lg"
              style={{ minWidth: 260 }}
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold text-yellow-400 hover:text-yellow-300 ml-1"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </>
      )}
    </>
  );
};

export default AuthForm;
