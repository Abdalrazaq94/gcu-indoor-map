import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./ContactUs.css"
import Footer from "../Footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const [messageType, setMessageType] = useState("enquiry"); // Default to 'enquiry'
  const [message, setMessage] = useState(""); // State for the message content
  const [isSubmitted, setIsSubmitted] = useState(false); // Submission status
  const navigate = useNavigate(); // For navigation

  // Function to handle message submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Retrieve the JWT token from localStorage
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found in localStorage. Please log in again.");
        toast.error("You must be logged in to send a message."); // Show toast error
        return;
      }

   

      // Send the POST request to the backend
      const response = await axios.post(
        "https://gcu-campus-guide-backend.onrender.com/send-message", // Replace with your backend endpoint
        {
          message, // The message content
          message_type: messageType, // The message type (enquiry/feedback)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the JWT token in the header
            "Content-Type": "application/json", // Ensure JSON content type
          },
        }
      );

      // If the response is successful, update the submission status
      if (response.status === 201) {
        console.log("Message sent successfully");
        toast.success("Message sent successfully!"); // Show success toast
        setIsSubmitted(true);
      }
    } catch (err) {
      // Handle errors from the backend
      console.error("Error during message submission:", err.response?.data || err.message);
      const errorMessage =
        err.response?.data?.error || "An error occurred while sending the message.";
      toast.error(errorMessage); // Show error toast
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact-container" style={{ fontFamily: '"Oswald", sans-serif' }}>
        <main className="mx-auto flex min-h-screen w-full items-center justify-center text-black">
          {isSubmitted ? (
            // Display a confirmation message upon successful submission
            <section className="flex flex-col items-center space-y-5 text-center">
              <h2 className="text-4xl font-medium">Thank You for Your Message!</h2>
              <p className="text-lg">We'll get back to you as soon as possible.</p>
              {/* Button to go back to the home page */}
              <button
                onClick={() => navigate("/")} // Navigate back to home
                className="transform rounded-sm py-2 px-4 font-bold text-white duration-300 hover:opacity-90"
                style={{ backgroundColor: "#003da6" }}
              >
                Go Back to Home page
              </button>
            </section>
          ) : (
            // The Contact Us form before submission
            <section className="flex w-[30rem] flex-col space-y-10">
              <div className="text-center text-6xl font-medium">Contact Us & Feedback</div>
              <div className="text-center text-lg font-normal text-gray-600">
                <p className="text-left">
                  Select <span className="font-semibold">"Enquiry"</span> to reach out to us with general questions or inquiries, and
                  <span className="font-semibold"> "Feedback"</span> to share your thoughts or provide feedback about our services.
                </p>

                <p className="text-left">
                  Ensure you are <span className="font-semibold text-blue-500">logged in</span> to send us a message.
                </p>
                <p className="text-left">
                  If you don’t have an account, please <span className="font-semibold text-blue-500">create an account</span> and log in before contacting us.
                </p>
              </div>


              {/* Dropdown for message type */}
              <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-black">
                <select
                  value={messageType}
                  onChange={(e) => setMessageType(e.target.value)}
                  className="w-full border-none bg-transparent text-black outline-none placeholder:italic focus:outline-none"
                  required
                >
                  <option value="enquiry">Enquiry</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              {/* Textarea for message content */}
              <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-black">
                <textarea
                  placeholder="Your Message"
                  className="w-full border-none bg-transparent text-black outline-none placeholder:italic focus:outline-none"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                className="transform rounded-sm py-2 px-4 font-bold text-white duration-300 hover:opacity-90"
                style={{ backgroundColor: "#003da6" }}
              >
                Send Message
              </button>
            </section>
          )}
        </main>
      </div>
      <Footer />
      {/* ToastContainer to render toast notifications */}
      <ToastContainer />
    </>
  );
};

export default ContactUs;
