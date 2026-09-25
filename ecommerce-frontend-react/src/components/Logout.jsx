import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const REDIRECT_SECONDS = 3;

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  // Perform the logout as soon as this page opens
  useEffect(() => {
    onLogout(); // removes the token and sets loggedIn=false in App

    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, REDIRECT_SECONDS * 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#f3f4f6" }}
    >
      <div
        className="card p-4 text-center"
        style={{ width: "340px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
      >
        <h3 className="mb-2">You have been logged out</h3>
        <p className="text-muted">
          Redirecting to the sign in page in {REDIRECT_SECONDS} seconds.
        </p>
        <button
          className="btn btn-primary w-100"
          onClick={() => navigate("/login", { replace: true })}
        >
          Sign in again
        </button>
      </div>
    </div>
  );
};

export default Logout;
