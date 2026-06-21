import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from "react-toastify"; // Optional: for notifications
import "react-toastify/dist/ReactToastify.css"; // Optional: for toast styling

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from query parameters
  const token = new URLSearchParams(location.search).get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("https://gcu-campus-guide-backend.onrender.com/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token as header
        },
        body: JSON.stringify({ new_password: newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        toast.success("Password reset successfully!");
        setTimeout(() => navigate("/login"), 3000); // Redirect to login after success
      } else {
        setError(data.error || "An error occurred. Please try again.");
        toast.error(data.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer /> {/* For notifications */}
      <div className="register-container" style={{ fontFamily: '"Oswald", sans-serif' }}>
        <main className="mx-auto flex min-h-screen w-full items-center justify-center text-black">
          <form onSubmit={handleSubmit} className="flex w-[30rem] flex-col space-y-10">
            <div className="text-center text-6xl font-medium">Reset Password</div>

            {/* New Password Input */}
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-black">
              <input
                type="password"
                id="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border-none bg-transparent text-black outline-none placeholder:italic focus:outline-none"
                required
              />
            </div>

            {/* Confirm New Password Input */}
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-black">
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border-none bg-transparent text-black outline-none placeholder:italic focus:outline-none"
                required
              />
            </div>

            {/* Reset Password Button */}
            <button
              type="submit"
              className="transform rounded-sm py-2 font-bold duration-300 text-white hover:opacity-90"
              style={{ backgroundColor: "#003da6" }}
            >
              Reset Password
            </button>

            {/* Success/Error Message */}
            {message && <p className="text-center text-green-500">{message}</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
          </form>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
