import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Registration endpoint is outside /api
      await axios.post(
        "https://ecommerce-backend-wzhe.onrender.com/user/register",
        {
          username,
          password,
        }
      );

      setSuccess(
        "Registration successful. Redirecting to sign in..."
      );

      setTimeout(
        () => navigate("/login", { replace: true }),
        1500
      );
    } catch (err) {
      console.error("Register error:", err);

      if (!err.response) {
        setError(
          "Cannot reach the server (network or CORS problem). Check the browser console."
        );
      } else if (err.response.status === 409) {
        setError("That username is already taken.");
      } else if (err.response.status === 403) {
        setError(
          "Registration blocked by the server (403). Check that /user/register is allowed in your security config."
        );
      } else {
        setError(
          `Registration failed (HTTP ${err.response.status}).`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="card p-4"
        style={{
          width: "340px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3 className="mb-3 text-center">
          Register
        </h3>

        <input
          className="form-control mb-3"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          required
        />

        {error && (
          <div className="alert alert-danger py-2">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success py-2">
            {success}
          </div>
        )}

        <button
          className="btn btn-primary w-100"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;