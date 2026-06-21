import React from 'react';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router-dom';
import './WelcomePage.css';


const WelcomePage = () => {
  return (
    <>
      <div className="welcome-page-container">
      <div className="parent">
        <div className="header-section">
          <img src={logo} alt="GCU Logo" className="logo-image" />
        </div>

          <div className="info-section">
            <div className="info-content">
              <div className="desc-container">
                <p className="description">
                  GCU Campus Guide, an app which helps you navigate through the GCU campus
                </p>
              </div>
              <div className="button-group">
                <Link to="/login">
                  <button className="login-button">
                    Log In
                  </button>
                </Link>
                <Link to="/register">
                  <button className="register-button">
                    Register
                  </button>
                </Link>
              </div>
            </div>
            <div className='line' />
            <p className="footer-text">
              *If you are not sure of how the website works, just check our starter guide down below
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default WelcomePage