import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ConfirmationPage from "../components/ConfirmationPage.jsx";

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("ConfirmationPage Component", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  test("renders correctly with booking details", async () => {
    const mockBooking = {
      id: "1234",
      firstName: "yeshas",
      lastName: "murthy",
      email: "yeshas.murthy@gmail.com",
      phone: "1234567890",
      selectedRoom: "Deluxe Suite",
      price: "$200",
      checkIn: "2025-03-10",
      checkOut: "2025-03-15",
      guests: "2",
    };
    
    localStorage.setItem("latestBooking", JSON.stringify(mockBooking));

    render(
      <MemoryRouter>
        <ConfirmationPage />
      </MemoryRouter>
    );

    expect(await screen.findByText("Booking Confirmed! 🎉")).toBeInTheDocument();
    expect(screen.getByText("Booking ID:")).toBeInTheDocument();
    expect(screen.getByText("1234")).toBeInTheDocument();
  });

  test("redirects if no booking found", async () => {
    render(
      <MemoryRouter>
        <ConfirmationPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/booking");
    }, { timeout: 2500});
  });

  test("Download Receipt button exists and is clickable", async () => {
    const mockBooking = { id: "1234", firstName: "yeshas", lastName: "murthy" };
    localStorage.setItem("latestBooking", JSON.stringify(mockBooking));

    render(
      <MemoryRouter>
        <ConfirmationPage />
      </MemoryRouter>
    );

    const downloadButton = await screen.findByText("Download Receipt (PDF)");
    expect(downloadButton).toBeInTheDocument();
    fireEvent.click(downloadButton);
  });
});
