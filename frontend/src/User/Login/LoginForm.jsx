import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState(""); // State for username or email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(null); // State for errors
  const navigate = useNavigate(); // For navigation after login
  const { login } = useAuth(); // Get login function from AuthContext

  const handleSubmit = async () => {
    setError(null); // Clear previous errors

    // Validation for empty fields
    if (!usernameOrEmail.trim() || !password.trim()) {
      setError("Both username/email and password are required.");
      return;
    }

    try {
      // Send login request to backend
      const response = await fetch("https://gcu-campus-guide-backend.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username_or_email: usernameOrEmail, password }),
      });

      const data = await response.json(); // Parse the response

      if (response.ok && data.access_token) {
        // Decode token to get user role details (optional if backend returns is_admin directly)
        const decodedToken = JSON.parse(atob(data.access_token.split('.')[1]));

        // Save the token and user details
        login(data.access_token, { username: decodedToken.username, is_admin: decodedToken.is_admin });

        // Redirect based on `is_admin` status
        if (decodedToken.is_admin) {
          navigate("/admin-panel"); // Redirect admin users to admin panel
        } else {
          navigate("/map"); // Redirect regular users to map page
        }
      } else {
        setError(data.error || "Invalid credentials"); // Show error message
      }
    } catch (err) {
      setError("Something went wrong. Please try again later."); // Handle unexpected errors
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-container" style={{ fontFamily: '"Oswald", sans-serif' }}>
        <main className="mx-auto flex min-h-screen w-full items-center justify-center text-black">
          <section className="flex w-[30rem] flex-col space-y-10">
            <div className="text-center text-6xl font-medium">Log In</div>

            {/* Error message */}
            {error && (
              <div className="text-center text-red-500 text-lg">
                {error}
              </div>
            )}

            {/* Username or Email input */}
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-black">
              <input
                type="text"
                placeholder="Username or Email"
                className="w-full border-none bg-transparent text-black outline-none placeholder:italic focus:outline-none"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
              />
            </div>

            {/* Password input */}
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-black">
              <input
                type="password"
                placeholder="Password"
                className="w-full border-none bg-transparent text-black outline-none placeholder:italic focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit button */}
            <button
              className="transform rounded-sm py-2 font-bold duration-300 text-white hover:opacity-90"
              style={{ backgroundColor: "#003da6" }}
              onClick={handleSubmit}
            >
              LOG IN
            </button>

            {/* Forgot password link */}
            <Link
              to="/request-password-reset"
              className="transform text-center font-semibold text-gray-500 duration-300 hover:text-black"
            >
              FORGOT PASSWORD?
            </Link>

            {/* Register link */}
            <p className="text-center text-lg">
              Do not have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-500 underline-offset-4 hover:underline"
              >
                Create One
              </Link>
            </p>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Login;
