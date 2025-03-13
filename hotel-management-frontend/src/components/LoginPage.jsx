import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // email valedetie
  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  // password valedetie
  const validatePassword = (password) => {
    return password.length >= 6; // Minimum 6 characters
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let validationErrors = {};

    const validateEmail = (email) => {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    };
    

    if (!email) {
      validationErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      validationErrors.email = "Please enter a valid email address (e.g., suhas@gmail.com).";
    }

    if (!password) {
      validationErrors.password = "Password is required.";
    } else if (!validatePassword(password)) {
      validationErrors.password = "Password must be at least 6 characters.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); 
    alert("Login successful! Redirecting to Booking Page...");
    navigate("/booking");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleForgotPassword = () => {
    alert("Coming soon!");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. suhas@gmail.com"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>

        {/* Register and Forgot Password buttons */}
        <div className="extra-options">
          <p onClick={handleForgotPassword} className="forgot-password">Forgot Password?</p>
          <p onClick={handleRegister} className="register-link">
            Don't have an account? <span>Register</span>
          </p>
          <button onClick={() => navigate("/admin-login")}>Admin Login</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
