import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EditBookingPage from "../components/EditBookingPage.jsx";

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("EditBookingPage Component", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  test("redirects if no booking is found", async () => {
    render(
      <MemoryRouter>
        <EditBookingPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/booking");
    }, { timeout: 3000 });
  });

  test("renders booking details from localStorage", async () => {
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
        <EditBookingPage />
      </MemoryRouter>
    );

    expect(await screen.findByDisplayValue("yeshas")).toBeInTheDocument();
    expect(screen.getByDisplayValue("murthy")).toBeInTheDocument();
    expect(screen.getByDisplayValue("yeshas.murthy@gmail.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1234567890")).toBeInTheDocument();
  });

  test("updates input fields correctly", async () => {
    const mockBooking = { id: "1234", firstName: "yeshas", lastName: "murthy" };
    localStorage.setItem("latestBooking", JSON.stringify(mockBooking));

    render(
      <MemoryRouter>
        <EditBookingPage />
      </MemoryRouter>
    );

    const firstNameInput = await screen.findByDisplayValue("yeshas");
    fireEvent.change(firstNameInput, { target: { value: "Jane" } });
    expect(firstNameInput.value).toBe("Jane");
  });

  test("saves changes and redirects to confirmation page", async () => {
    const mockBooking = {
      firstName: "yeshas",
      lastName: "murthy",
      email: "yeshas.murthy@gamil.com",
      phone: "1234567890",
      checkIn: "2025-03-10",
      checkOut: "2025-03-15",
      guests: "2",
    };
    localStorage.setItem("latestBooking", JSON.stringify(mockBooking));

    render(
      <MemoryRouter>
        <EditBookingPage />
      </MemoryRouter>
    );

    const saveButton = await screen.findByText("Save Changes");
    fireEvent.click(saveButton);

    await waitFor(() => {
      const updatedBooking = JSON.parse(localStorage.getItem("latestBooking"));
      expect(updatedBooking).toBeTruthy(); // Ensure booking exists
      expect(mockNavigate).toHaveBeenCalledWith("/confirmation");
    });
  });
}); 