import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from "react-toastify"; // Optional: for notifications
import "react-toastify/dist/ReactToastify.css"; // Optional: for toast styling

const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Email is required.");
      toast.error("Email is required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/request-password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        toast.success("Password reset email sent successfully!");
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
            <div className="text-center text-6xl font-medium">Request Password Reset</div>

            {/* Email Input */}
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-black">
              <input
                type="email"
                id="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-none bg-transparent text-black outline-none placeholder:italic focus:outline-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="transform rounded-sm py-2 font-bold duration-300 text-white hover:opacity-90"
              style={{ backgroundColor: "#003da6" }}
            >
              Send Password Reset Email
            </button>

            {/* Success/Error Messages */}
            {message && <p className="text-center text-green-500">{message}</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
          </form>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default RequestPasswordReset;
