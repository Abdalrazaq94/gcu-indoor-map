import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../User/Login/AuthContext"; // Import AuthContext
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth(); // Access logout and user details
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/admin-panel", icon: "📊" },
    { name: "Feedback", path: "/feedback-view-table", icon: "📝" },
    { name: "Messages", path: "/contact-us-table-view", icon: "✉️" },
    { name: "Admin", path: "/admin-user-table", icon: "👤" },
    { name: "Users", path: "/user-table-view", icon: "👥" },
  ];

  return (
    <nav className="bg-[#003DA6] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo or Title */}
          <div className="flex items-center">
            <Link to="/admin-panel" className="flex-shrink-0">
              <span className="font-bold text-xl">Admin Panel</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.path
                      ? "bg-[#002D7A] text-white"
                      : "text-gray-300 hover:bg-[#002D7A] hover:text-white"
                  } transition duration-150 ease-in-out`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
              {/* Logout Option */}
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-[#002D7A] hover:text-white transition duration-150 ease-in-out"
              >
                <span className="mr-2">🚪</span> Logout
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#002D7A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? "bg-[#002D7A] text-white"
                    : "text-gray-300 hover:bg-[#002D7A] hover:text-white"
                } transition duration-150 ease-in-out`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            ))}
            {/* Logout Option for Mobile */}
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-[#002D7A] hover:text-white transition duration-150 ease-in-out"
            >
              <span className="mr-2">🚪</span> Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
