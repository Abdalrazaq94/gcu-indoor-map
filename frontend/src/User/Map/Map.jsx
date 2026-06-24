import React from "react";
import { useAuth } from "../Login/AuthContext";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Map = () => {
  const { isLoggedIn } = useAuth(); // Check if the user is logged in

  return (
    <>
      <Navbar />
      <div style={{ fontFamily: '"Oswald", sans-serif', minHeight: "100vh" }}>
        {isLoggedIn ? (
          // If the user is logged in, show the Map iframe
          <iframe
            src="https://app.mappedin.com/map/673de0bf38b831000b2d1c5a-ba6L"
            title="Map"
            style={{ width: "100%", height: "100vh", border: "none" }}
            sandbox="allow-same-origin allow-scripts"
          ></iframe>
        ) : (
          // If the user is NOT logged in, show a centered prompt to log in / register
          <div
            style={{
              minHeight: "80vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                maxWidth: "480px",
                width: "100%",
                padding: "2.5rem 2rem",
                borderRadius: "16px",
                backgroundColor: "#ffffff",
                border: "1px solid #eee",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
              }}
            >
              <h1
                style={{
                  fontSize: "2rem",
                  color: "#003da6",
                  marginBottom: "0.75rem",
                }}
              >
                View the Campus Map
              </h1>

              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#444",
                  lineHeight: 1.5,
                  marginBottom: "2rem",
                }}
              >
                You need an account to access the interactive campus map.
                Please log in, or create an account to get started.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="/login"
                  style={{
                    backgroundColor: "#003da6",
                    color: "#ffffff",
                    padding: "0.75rem 1.75rem",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "1.05rem",
                    fontWeight: 500,
                  }}
                >
                  Log In
                </a>

                <a
                  href="/register"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#003da6",
                    padding: "0.75rem 1.75rem",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "1.05rem",
                    fontWeight: 500,
                    border: "2px solid #003da6",
                  }}
                >
                  Create an Account
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Map;