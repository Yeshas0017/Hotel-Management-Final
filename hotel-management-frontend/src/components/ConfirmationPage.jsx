import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import './ConfirmationPage.css'; 
const ConfirmationPage = () => {
  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching latest booking...");

    try {
      // Retrieve the latest booking from localStorage
      const latestBooking = JSON.parse(localStorage.getItem("latestBooking"));
      console.log("Retrieved booking:", latestBooking);

      if (latestBooking) {
        setBooking(latestBooking); // Update state with the latest booking data
      } else {
        setTimeout(() => {
          alert("No recent booking found. Redirecting to booking page.");

          navigate("/booking"); // Redirect to booking page if no booking found
        }, 2000);
      }
    } catch (error) {
      console.error("Error retrieving booking:", error);
      alert("Error loading booking details.");
      navigate("/booking"); // Redirect to booking page in case of an error
    }
  }, [navigate]); 

  // to downlode PDF of the booking receipt
  const generatePDF = () => {
    const input = document.getElementById("receipt");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // convert image to (PDF) and save it
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("Booking_Receipt.pdf");
    });
  };

  return (
    <div className="confirmation-page">
      <h1>Booking Confirmed! 🎉</h1>

      {booking ? (
        <div id="receipt" className="booking-details">
          <h2>Booking Receipt</h2>
          <p><strong>Booking ID:</strong> {booking.id}</p>
          <p><strong>Guest Name:</strong> {booking.firstName} {booking.lastName}</p>
          <p><strong>Email:</strong> {booking.email}</p>
          <p><strong>Phone:</strong> {booking.phone}</p>
          <p><strong>Room:</strong> {booking.selectedRoom}</p>
          <p><strong>Price:</strong> {booking.price}</p>
          <p><strong>Check-In:</strong> {booking.checkIn}</p>
          <p><strong>Check-Out:</strong> {booking.checkOut}</p>
          <p><strong>Guests:</strong> {booking.guests}</p>
        </div>
      ) : (
        <p>Loading booking details...</p>
      )}

      <button onClick={generatePDF}>Download Receipt (PDF)</button>

      <button onClick={() => navigate("/booking")}>Make Another Booking</button>

      <button onClick={() => navigate("/edit-booking")}>Edit Booking</button>

    
    </div>
  );
};

export default ConfirmationPage;

