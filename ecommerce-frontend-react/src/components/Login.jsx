import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axios";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/user/login", {
        username,
        password,
      });

      // Backend returns either the raw JWT string or { token: "..." }
      const token =
        typeof res.data === "string"
          ? res.data
          : res.data?.token;

      if (token && token !== "failed") {
        localStorage.setItem("token", token);

        // Tell App that login was successful
        onLogin();

        navigate("/", { replace: true });
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      console.error("Login error:", err);

      if (!err.response) {
        setError(
          "Cannot reach the server (network or CORS problem). Check the browser console."
        );
      } else if (
        err.response.status === 401 ||
        err.response.status === 403
      ) {
        setError("Invalid username or password.");
      } else {
        setError(
          `Login failed (HTTP ${err.response.status}).`
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
          Sign in
        </h3>

        <input
          className="form-control mb-3"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          required
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        {error && (
          <div className="alert alert-danger py-2">
            {error}
          </div>
        )}

        <button
          className="btn btn-primary w-100"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Signing in..."
            : "Sign in"}
        </button>

        <Link
          className="btn btn-outline-secondary w-100 mt-2"
          to="/register"
        >
          Register
        </Link>
      </form>
    </div>
  );
};

export default Login;