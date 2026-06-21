import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem("authToken") || null);
    const [user, setUser] = useState(() => {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    });
  
    const login = (token, userData) => {
      setAuthToken(token);
      setUser(userData); // Save user data (including is_admin)
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(userData)); // Save user data in local storage
    };
  
    const logout = () => {
      setAuthToken(null);
      setUser(null);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn: !!authToken, user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
export const useAuth = () => useContext(AuthContext);
