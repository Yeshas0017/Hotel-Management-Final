import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function AdminPage() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("allBookings"));
    if (storedBookings) {
      setBookings(storedBookings);
    } 
    else {
      alert("No bookings found.");
    }
  }, []); //array dependency

  const handleEdit = (id) => {
    const selectedBooking = bookings.find((booking) => booking.id === id);
    localStorage.setItem("latestBooking", JSON.stringify(selectedBooking));
    navigate("/edit-booking");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      const updatedBookings = bookings.filter((booking) => booking.id !== id);
      setBookings(updatedBookings);
      localStorage.setItem("allBookings", JSON.stringify(updatedBookings));
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin - Manage Bookings</h1>
      <table className="booking-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Guests</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.checkIn}</td>
              <td>{booking.checkOut}</td>
              <td>{booking.guests}</td>
              <td>
                <button onClick={() => handleEdit(booking.id)}>Edit</button>
                <button onClick={() => handleDelete(booking.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
