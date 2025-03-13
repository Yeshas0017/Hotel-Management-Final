import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookingPage.css";

// Import images
import roomImage1 from "../assets/room1.jpg";
import roomImage2 from "../assets/room2.jpg";
import roomImage3 from "../assets/room3.jpg";



// Room Types
const roomTypes = [
  { id: 1, name: "Standard Room", image: roomImage1, price: "$100/night" },
  { id: 2, name: "Deluxe Room", image: roomImage2, price: "$150/night" },
  { id: 3, name: "Suite", image: roomImage3, price: "$200/night" },
];

const BookingPage = () => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cvv, setCvv] = useState("");

  // Get today's date and disable previous dates
  
  const today = new Date();
today.setMinutes(today.getMinutes() - today.getTimezoneOffset()); // local time(europ )
const todayString = today.toISOString().split("T")[0]; 

// to  check-in weather date is not in the past
<input
  type="date"
  id="checkIn"
  name="checkIn"
  min={todayString}  t
  value={checkIn}
  onChange={(e) => setCheckIn(e.target.value)}
  required
/>

  // for letter only
  const handleCardNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setCardName(value);
  };

  // Handle form submission
  const handleBooking = (e) => {
    e.preventDefault();

    if (!selectedRoom) {
      alert("Please select a room type.");
      return;
    }
    if (!/^\d{16}$/.test(cardNumber)) {
      alert("Please enter a valid 16-digit card number.");
      return;
    }
    if (!/^\d{3}$/.test(cvv)) {
      alert("CVV must be exactly 3 digits.");
      return;
    }

    // Generate a unique ID using Date + Random Number
    const uniqueId = Date.now() + Math.floor(Math.random() * 1000);

    // Get selected room details
    const roomDetails = roomTypes.find(room => room.id === selectedRoom);

    // Generate a unique ID for the booking
    const bookingId = Date.now(); 

    // Save booking details to localStorage
    const newBooking = {
      id: uniqueId, // new everytime unique ID
      firstName,
      lastName,
      email,
      phone,
      checkIn,
      checkOut,
      guests,
      selectedRoom: roomDetails.name,
      price: roomDetails.price,
    };

    // retrieve existing bookings from localStorage
    const existingBookings = JSON.parse(localStorage.getItem("allBookings")) || [];

    // adding new booking to the list
    const updatedBookings = [...existingBookings, newBooking];


    // save updated bookings back to localStorage
    localStorage.setItem("allBookings", JSON.stringify(updatedBookings));

    

    localStorage.setItem("latestBooking", JSON.stringify(newBooking));
    console.log('Booking successful!'); 
    alert("Booking successful!");
    navigate("/confirmation");


  };// save the latest booking separately

  return (
    
    <div className="booking-page">
      <h1>Book Your Stay</h1>
      <div className="room-selection">
        {roomTypes.map((room) => (
          <div
            key={room.id}
            className={`room-card ${selectedRoom === room.id ? "selected" : ""}`}

            onClick={() => setSelectedRoom(room.id)}
          >
            <img src={room.image} alt={room.name} />
            <h3>{room.name}</h3>

            <p>{room.price}</p>

          </div>
        ))}

      </div>
      <form className="booking-form" onSubmit={handleBooking}>
        <div className="form-group">
          <label>First Name:</label>

          <input
            type="text"
            name="firstName"
            value={firstName}

            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>

          <input

            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}

            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input

            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

            required
          />

        </div>
        <div className="form-group">
  <label>Phone Number:</label>
  <input
    type="tel"
    name="phone"

    value={phone}
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, "").slice(0, 10); // Only digits and limit to 10 characters
      setPhone(value);

    }}
    required
  />
</div>

<div className="form-group">
  <label htmlFor="checkIn">Check-In Date:</label>

  <input
    type="date"
    id="checkIn"
    name="checkIn"
    min={todayString}  // to check that the check-in will not  be in the past>>>.
    value={checkIn}
    onChange={(e) => setCheckIn(e.target.value)}
    required
  />
</div>


<div className="form-group">
  <label htmlFor="checkOut">Check-Out Date:</label>

  <input
    type="date"
    id="checkOut"
    name="checkOut"
    min={checkIn || todayString}  // to  check-out date is not before the check-in date
    value={checkOut}
    onChange={(e) => setCheckOut(e.target.value)}
    required
  />
</div>

<div className="form-group">
  <label htmlFor="guests">Number of Guests:</label>
  <select
    id="guests"  
    name="guests"
    value={guests}
    onChange={(e) => setGuests(e.target.value)}

    required
  >
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
  </select>
</div>


        <h2>Payment Details</h2>
        <div className="form-group">
          <label>Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
            maxLength="16"
            required
          />
        </div>
        <div className="form-group">
          <label>Card Name:</label>
          <input
            type="text"
            name="cardName"
            value={cardName}
            onChange={handleCardNameChange} 
            required
          />
        </div>
        <div className="form-group">
          <label>CVV:</label>
          <input
            type="text"
            name="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
            maxLength="3"
            required
          />
        </div>
        <button type="submit" className="confirm-btn">Confirm Booking</button>
      </form>
    </div>
    
  );
};

export default BookingPage;

