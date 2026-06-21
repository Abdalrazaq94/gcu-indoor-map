import React, { useState } from 'react';
import './RegisterForm.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!'); // Show error toast
      return;
    }

    try {
      const response = await axios.post('https://gcu-campus-guide-backend.onrender.com/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        toast.success('Account created successfully!'); // Show success toast
        setFormData({ username: '', email: '', password: '', confirmPassword: '' }); // Clear form
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.error || 'Registration failed!');
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer /> {/* Add ToastContainer to enable notifications */}
      <div className='register-container' style={{ fontFamily: '"Oswald", sans-serif' }}>
        <main className="mx-auto flex min-h-screen w-full items-center justify-center text-black">
          <form onSubmit={handleSubmit} className="flex w-[30rem] flex-col space-y-10">
            <div className="text-center text-6xl font-medium">Register</div>

            {/* Username Input */}
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-black">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border-none bg-transparent text-black outline-none placeholder:italic focus:outline-none"
                required
              />
            </div>

            {/* Email Input */}
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-black">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-none bg-transparent text-black outline-none placeholder:italic focus:outline-none"
                required
              />
            </div>

            {/* Password Input */}
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-black">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-none bg-transparent text-black outline-none placeholder:italic focus:outline-none"
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-black">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border-none bg-transparent text-black outline-none placeholder:italic focus:outline-none"
                required
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="transform rounded-sm py-2 font-bold duration-300 text-white hover:opacity-90"
              style={{ backgroundColor: '#003da6' }}
            >
              REGISTER
            </button>

            {/* Redirect to Login */}
            <p className="text-center text-lg">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-500 underline-offset-4 hover:underline">
                Log In
              </Link>
            </p>
          </form>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default RegisterForm;
