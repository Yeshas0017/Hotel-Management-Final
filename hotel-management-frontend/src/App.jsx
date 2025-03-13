import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import './index.css';  
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import BookingPage from "./components/BookingPage";
import ConfirmationPage from "./components/ConfirmationPage";
import EditBookingPage from "./components/EditBookingPage";
import Admin from "./components/Admin";  
import AdminLogin from "./components/AdminLogin";  

function BodyClassSetter() {
  const location = useLocation();

  useEffect(() => {
    // Convert path to class name (e.g., "/login" -> "login-page")
    let pageClass = location.pathname.replace("/", "") || "home";
    document.body.className = pageClass;  // Apply the class to <body>
  }, [location]);

  return null; // This component does not render anything
}

function App() {
  return (
    <Router>
      <BodyClassSetter /> {/* Ensures body class is set dynamically */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/edit-booking" element={<EditBookingPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
