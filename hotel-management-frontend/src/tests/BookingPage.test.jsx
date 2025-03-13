import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BookingPage from "../components/BookingPage.jsx";
import '@testing-library/jest-dom';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("BookingPage Component", () => {
  let today;

  beforeEach(() => {
    // Set today's date for the 'min' attribute and clear localStorage
    today = new Date().toISOString().split("T")[0];
    localStorage.clear();
    mockNavigate.mockClear();
  });

  afterEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  // Test if the page renders correctly
  test("renders the booking page correctly", () => {
    render(
      <BrowserRouter>
        <BookingPage />
      </BrowserRouter>
    );

    expect(screen.getByText("Book Your Stay")).toBeInTheDocument();
    expect(screen.getByText("Standard Room")).toBeInTheDocument();
    expect(screen.getByText("Deluxe Room")).toBeInTheDocument();
    expect(screen.getByText("Suite")).toBeInTheDocument();
    expect(screen.getByText("Confirm Booking")).toBeInTheDocument();
  });

  // Test room selection
  test("selects a room when clicked", () => {
    render(
      <BrowserRouter>
        <BookingPage />
      </BrowserRouter>
    );

    const standardRoomButton = screen.getByText("Standard Room");
    fireEvent.click(standardRoomButton);

    // Check if the room is selected by verifying the class
    expect(standardRoomButton.closest(".room-card")).toHaveClass("selected");
  });

  // Test that only one room can be selected at a time
  test("allows only one room to be selected at a time", () => {
    render(
      <BrowserRouter>
        <BookingPage />
      </BrowserRouter>
    );

    const standardRoomButton = screen.getByText("Standard Room");
    const deluxeRoomButton = screen.getByText("Deluxe Room");

    // Click Standard Room
    fireEvent.click(standardRoomButton);
    expect(standardRoomButton.closest(".room-card")).toHaveClass("selected");

    // Click Deluxe Room (should deselect Standard Room)
    fireEvent.click(deluxeRoomButton);
    expect(deluxeRoomButton.closest(".room-card")).toHaveClass("selected");
    expect(standardRoomButton.closest(".room-card")).not.toHaveClass("selected");
  });

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  test('prevents check-in date from being in the past', async () => {
    render(<BookingPage />);
  
    // Create today's date in UTC and format it to dd-mm-yyyy
    const today = formatDate(new Date());
  
    // Get the check-in input
    const checkInInput = screen.getByLabelText(/Check-In Date/i);
  
    // Simulate a past date (e.g., yesterday) and format it to dd-mm-yyyy
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    const pastDateString = formatDate(pastDate);
  
    // Set check-in date to a past date
    fireEvent.change(checkInInput, { target: { value: pastDateString } });
  
  
  });

  test('prevents check-out date from being before check-in date', async () => {
    render(<BookingPage />);

    const checkInInput = screen.getByLabelText(/Check-In Date/i);
    const checkOutInput = screen.getByLabelText(/Check-Out Date/i);

    // Set the check-in date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];

    fireEvent.change(checkInInput, { target: { value: tomorrowString } });

    // Set the check-out date to a date before check-in (e.g., today)
    const todayString = today;
    fireEvent.change(checkOutInput, { target: { value: todayString } });

    
  });
  

  test("ensures min attribute is set correctly on the check-in date", () => {
    render(<BookingPage />);

    const checkInInput = screen.getByLabelText(/Check-In Date/i);

    // Check if the min attribute is today's date
    expect(checkInInput).toHaveAttribute("min", today);
  });

  test("ensures min attribute is set correctly on the check-out date", async () => {
    render(<BookingPage />);

    const checkInInput = screen.getByLabelText(/Check-In Date/i);
    const checkOutInput = screen.getByLabelText(/Check-Out Date/i);

    // Set the check-in date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split("T")[0];
    fireEvent.change(checkInInput, { target: { value: tomorrowString } });

    // Ensure the min attribute on the check-out date is set to the check-in date or later
    expect(checkOutInput).toHaveAttribute("min", tomorrowString);
  });
});
