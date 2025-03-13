import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./HomePage.css"; // Import the CSS for the component

// for images 
import roomImage1 from "../assets/room1.jpg";
import roomImage2 from "../assets/room2.jpg";
import roomImage3 from "../assets/room3.jpg";

const HomePage = () => {
  const navigate = useNavigate(); 

  const handleLoginClick = () => {
    navigate("/login"); // >> for login
  };

  return (
    <div className="home-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          <h3>🏢Hotel Management</h3>
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact Us</a></li>
          <li><button className="login-btn" onClick={handleLoginClick}>Login</button></li>
        </ul>
      </nav>

      {/* Hero Section with Video */}
      <header className="hero">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/videos/hotel-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </header>

      {/* Room Showcase */}
      <RoomShowcase />

      {/* About Us Section */}
      <section id="about" className="about">
        <h2>About Us</h2>
        <p>
          Welcome to our prestigious hotel, where we offer world-class amenities
          and hospitality. Whether you're here for business or leisure, we ensure
          a memorable stay.
        </p>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>Email: info@hotelmanagement.com</p>
        <p>Phone: +1 234 567 890</p>
        <p>Address: 123 Luxury St, Hotel City, HC 56789</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Hotel Management. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Room Showcase Component
const RoomShowcase = () => {
  const [showAmenities, setShowAmenities] = useState(null); // Manage which room's amenities are shown

  // Handler for toggling the amenities visibility
  const handleAmenitiesClick = (roomId) => {
    setShowAmenities(showAmenities === roomId ? null : roomId); 
  };

  return (
    <section className="rooms">
      <h2>Our Rooms</h2>
      <div className="room-gallery">
        <div className="room">
          <img src={roomImage1} alt="Luxury Room" />
          <p>Standard Room - $100/night</p>
          <button onClick={() => handleAmenitiesClick(1)}>Amenities</button>
          {showAmenities === 1 && (
            <div className="amenities">
              <ul>
                <li><i className="fas fa-parking"></i> Free parking on premises (1 space)</li>
                <li><i className="fas fa-tv"></i> TV available</li>
                <li><i className="fas fa-elevator"></i> Lift</li>
                <li><i className="fas fa-tshirt"></i> Washing machine and Dryer - In building</li>
                <li><i className="fas fa-chair"></i> Private patio or balcony</li>
                <li><i className="fas fa-user"></i> Wifi</li>
                <li><i className="fas fa-exclamation-circle"></i> Carbon monoxide alarm available</li>
              </ul>
            </div>
          )}
        </div>
        <div className="room">
          <img src={roomImage2} alt="Deluxe Room" />
          <p>Deluxe Room - $150/night</p>
          <button onClick={() => handleAmenitiesClick(2)}>Amenities</button>
          {showAmenities === 2 && (
            <div className="amenities">
              <ul>
                <li><i className="fas fa-parking"></i> Free parking on premises (1 space)</li>
                <li><i className="fas fa-tv"></i> TV available</li>
                <li><i className="fas fa-elevator"></i> Lift</li>
                <li><i className="fas fa-tshirt"></i> Washing machine and Dryer - In building</li>
                <li><i className="fas fa-chair"></i> Private patio or balcony</li>
                <li><i className="fas fa-user"></i> Wifi</li>
                <li><i className="fas fa-exclamation-circle"></i> Carbon monoxide alarm available</li>
                <li><i className="fas fa-user"></i> Coffee maker</li>
              </ul>
            </div>
          )}
        </div>
        <div className="room">
          <img src={roomImage3} alt="Luxury Room" />
          <p>Luxury Room - $200/night</p>
          <button onClick={() => handleAmenitiesClick(3)}>Amenities</button>
          {showAmenities === 3 && (
            <div className="amenities">
              <ul>
                <li><i className="fas fa-parking"></i> Free parking on premises (1 space)</li>
                <li><i className="fas fa-tv"></i> TV available</li>
                <li><i className="fas fa-elevator"></i> Lift</li>
                <li><i className="fas fa-tshirt"></i> Washing machine and Dryer – In building</li>
                <li><i className="fas fa-chair"></i> Private patio or balcony</li>
                <li><i className="fas fa-user"></i> Wifi</li>
                <li><i className="fas fa-exclamation-circle"></i> Carbon monoxide alarm available</li>
                <li><i className="fas fa-user"></i> Coffee maker</li>
                <li><i className="fas fa-user"></i> Private indoor pool</li>
                <li><i className="fas fa-user"></i> Private sauna</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
