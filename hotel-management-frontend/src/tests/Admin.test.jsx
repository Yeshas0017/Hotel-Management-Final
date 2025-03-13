import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Admin from "../components/Admin.jsx";


const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Admin Component", () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  test("renders bookings from localStorage", () => {
    const mockBookings = [
      { id: Math.random().toString(36).slice(2, 9), checkIn: "2025-03-10", checkOut: "2025-03-15", guests: "2" },
      { id: Math.random().toString(36).slice(2, 9), checkIn: "2025-03-11", checkOut: "2025-03-16", guests: "3" },
    ];
    localStorage.setItem("allBookings", JSON.stringify(mockBookings));

    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    expect(screen.getByText("Admin - Manage Bookings")).toBeInTheDocument();
    expect(screen.getByText(mockBookings[0].id)).toBeInTheDocument();
    expect(screen.getByText(mockBookings[0].checkIn)).toBeInTheDocument();
    expect(screen.getByText(mockBookings[0].checkOut)).toBeInTheDocument();
    expect(screen.getByText(mockBookings[0].guests)).toBeInTheDocument();
  });

  test("navigates to edit booking page when 'Edit' button is clicked", async () => {
    const mockBookings = [
      { id: "1", checkIn: "2025-03-10", checkOut: "2025-03-15", guests: "2" },
    ];
    localStorage.setItem("allBookings", JSON.stringify(mockBookings));

    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Edit"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/edit-booking");
    });
  });

  test("deletes booking and updates localStorage", async () => {
    const mockBookings = [
      { id: "1", checkIn: "2025-03-10", checkOut: "2025-03-15", guests: "2" },
      { id: "2", checkIn: "2025-03-11", checkOut: "2025-03-16", guests: "3" },
    ];
    localStorage.setItem("allBookings", JSON.stringify(mockBookings));

    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    
    window.confirm = jest.fn().mockReturnValue(true);

    fireEvent.click(screen.getAllByText("Delete")[0]); 

    await waitFor(() => {
     
      const updatedBookings = JSON.parse(localStorage.getItem("allBookings"));
      expect(updatedBookings.length).toBe(1); 
      expect(updatedBookings[0].id).toBe("2"); // The second booking should remain
    });
  });

  test("shows alert when no bookings are found in localStorage", () => {
    // Mocking alert function
    window.alert = jest.fn();

    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    expect(window.alert).toHaveBeenCalledWith("No bookings found.");
  });
});
