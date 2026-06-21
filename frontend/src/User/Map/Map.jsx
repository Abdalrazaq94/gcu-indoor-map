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
          // If the user is not logged in, show a message
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              pointerEvents: "none", // Prevent overlay from blocking the entire iframe
            }}
          >
            <div>
              <h1 style={{ fontSize: "2rem", color: "#003da6" }}>
                You must be logged in to access the map.
              </h1>
              <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
                <a href="/login" style={{ color: "#003da6", textDecoration: "underline" }}>
                  Click here to login
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Map;
