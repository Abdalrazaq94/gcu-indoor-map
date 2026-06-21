import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../Login/AuthContext"; // Import AuthContext
import logo from '../../assets/logo.png'; // Importing the logo
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const desktopMenuRef = useRef(null);

  const { isLoggedIn, user, logout } = useAuth(); // Access authentication and user data


  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Map', path: '/map' },
    ...(isLoggedIn && user?.is_admin ? [{ name: "Admin Panel", path: "/admin-panel" }] : []), // Add Admin Panel for admins
  ];

  const otherNavItems = [
    { name: 'Meet The Team', path: '/meet-the-team' }, 
    { name: 'Contact Us and Feedback', path: '/contact-us' },
    { name: 'FAQ', path: '/frequently-asked-question' }
  ]
  const teamItem = { name: 'Meet The Team', path: '/meet-the-team' };
  const contactItem = { name: 'Contact Us and Feedback', path: '/contact-us' };
  const faqItem = { name: 'FAQ', path: '/frequently-asked-question' };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopMenuRef.current && !desktopMenuRef.current.contains(event.target)) {
        setIsDesktopMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#003DA6] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <div className="bg-white p-2 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
                <img src={logo} alt="Logo" className="h-8 w-auto object-contain" />
              </div>
            </Link>
          </div>
          <div className="hidden md:flex md:space-x-4">
            {navItems.map((item, index) => (
              <Link key={index} to={item.path}>
                <button
                  className="font-oswald px-4 py-2 text-base sm:text-lg font-medium transition-all duration-300 ease-in-out"
                  style={{
                    backgroundColor: 'rgba(0, 61, 166, 255)',
                    color: 'white',
                    border: '2px solid rgba(0, 61, 166, 255)',
                    cursor: 'pointer',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = 'rgba(0, 61, 166, 255)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 61, 166, 255)';
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  {item.name}
                </button>
              </Link>
            ))}
            {/* Logout or Login Button */}
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="font-oswald px-4 py-2 text-base sm:text-lg font-medium transition-all duration-300 ease-in-out"
                style={{
                  backgroundColor: "rgba(255, 0, 0, 0.8)",
                  color: "white",
                  border: "2px solid rgba(255, 0, 0, 0.8)",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "rgba(255, 0, 0, 0.8)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
                  e.currentTarget.style.color = "white";
                }}
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button
                  className="font-oswald px-4 py-2 text-base sm:text-lg font-medium transition-all duration-300 ease-in-out"
                  style={{
                    backgroundColor: "rgba(0, 61, 166, 255)",
                    color: "white",
                    border: "2px solid rgba(0, 61, 166, 255)",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = "rgba(0, 61, 166, 255)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(0, 61, 166, 255)";
                    e.currentTarget.style.color = "white";
                  }}
                >
                  Login
                </button>
              </Link>
            )}
            {/* Hamburger Menu for Desktop */}
            <div className="-mr-2 flex relative" ref={desktopMenuRef}>
              <button
                onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#002D7A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open dropdown menu</span>
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              {isDesktopMenuOpen && (
                <div className="origin-bottom-right absolute right-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 mt-[45px]">
                  {/* Dropdown items styled as links */}
                  <Link to={teamItem.path}>
                    <div
                      className="about-button font-oswald px-4 py-3 text-base sm:text-lg font-medium w-full transition-all duration-300 ease-in-out text-left hover:bg-gray-100"
                      style={{
                        color: 'rgba(0, 61, 166, 255)',
                        cursor: 'pointer',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#002D7A'; 
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'white'; 
                        e.currentTarget.style.color = 'rgba(0, 61, 166, 255)';
                      }}
                    >
                      {teamItem.name}
                    </div>
                  </Link>
                  <Link to={contactItem.path}>
                    <div
                      className="about-button font-oswald px-4 py-3 text-base sm:text-lg font-medium w-full transition-all duration-300 ease-in-out text-left hover:bg-gray-100"
                      style={{
                        color: 'rgba(0, 61, 166, 255)',
                        cursor: 'pointer',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#002D7A'; 
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'white'; 
                        e.currentTarget.style.color = 'rgba(0, 61, 166, 255)';
                      }}
                    >
                      {contactItem.name}
                    </div>
                  </Link>
                  <Link to={faqItem.path}>
                    <div
                      className="about-button font-oswald px-4 py-3 text-base sm:text-lg font-medium w-full transition-all duration-300 ease-in-out text-left hover:bg-gray-100"
                      style={{
                        color: 'rgba(0, 61, 166, 255)',
                        cursor: 'pointer',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#002D7A'; 
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'white'; 
                        e.currentTarget.style.color = 'rgba(0, 61, 166, 255)';
                      }}
                    >
                      {faqItem.name}
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#002D7A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
  <div className="md:hidden" id="mobile-menu">
    <div className="px-2 pt-2 pb-3 space-y-2"> {/* Added space-y-2 for gaps between items */}
    {isOpen && (
  <div className="md:hidden" id="mobile-menu">
    <div className="px-2 pt-2 pb-3 space-y-2"> {/* Added space-y-2 for gaps between items */}
      {navItems.map((item, index) => (
        // Exclude Logout from this mapping
        item.name !== 'Logout' && (
          <Link key={index} to={item.path} className="block w-full">
            <div
              className="font-oswald px-3 py-2 text-base font-medium w-full text-left transition-all duration-300 ease-in-out rounded-md"
              style={{
                backgroundColor: 'rgba(0, 61, 166, 255)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, .1)',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = 'rgba(0, 61, 166)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 61, 166, 255)';
                e.currentTarget.style.color = 'white';
              }}
            >
              {item.name}
            </div>
          </Link>
        )
      ))}
      

      {otherNavItems.map((item, index) => ( 
        <Link key={index} to={item.path} className="block w-full">
          <div
            className="font-oswald px-3 py-2 text-base font-medium w-full text-left transition-all duration-300 ease-in-out rounded-md"
            style={{
              backgroundColor: 'rgba(0, 61, 166, 255)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, .1)',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = 'rgba(0, 61, 166)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 61, 166, 255)';
              e.currentTarget.style.color = 'white';
            }}
          >
            {item.name}
          </div>
        </Link>
      ))}

       {/* Add Logout at the end */}
       {isLoggedIn ? 
       <Link className="block w-full">
        <div
          className="font-oswald px-3 py-2 text-base font-medium w-full text-left transition-all duration-300 ease-in-out rounded-md"
          style={{
            backgroundColor: 'rgba(0, 61, 166, 255)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, .1)',
            cursor: 'pointer',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = 'rgba(0, 61, 166)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 61, 166, 255)';
            e.currentTarget.style.color = 'white';
          }}
          onClick={logout}
        >
          Logout
        </div>
      </Link>
      : (
        <Link to="/login" className="block w-full">
        <div
          className="font-oswald px-3 py-2 text-base font-medium w-full text-left transition-all duration-300 ease-in-out rounded-md"
          style={{
            backgroundColor: 'rgba(0, 61, 166, 255)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, .1)',
            cursor: 'pointer',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = 'rgba(0, 61, 166)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 61, 166, 255)';
            e.currentTarget.style.color = 'white';
          }}
        >
          Login
        </div>
      </Link>
      )
      }

    </div>
  </div>
)}
      
    </div>
  </div>
)}
      
     </nav> 
   )
}

export default Navbar;