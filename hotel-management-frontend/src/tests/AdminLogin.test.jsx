import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminLogin from "../components/AdminLogin.jsx";
import { useNavigate } from "react-router-dom";

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));


global.alert = jest.fn();

describe("AdminLogin Component", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
    global.alert.mockClear();
  });

  test("renders login form", () => {
    render(
      <MemoryRouter>
        <AdminLogin />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("logs in with valid credentials and redirects to admin page", async () => {
    render(
      <MemoryRouter>
        <AdminLogin />
      </MemoryRouter>
    );
  
    
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "admin" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "admin123" } });
  
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
  
   
    await waitFor(() => {
      expect(localStorage.getItem("isAdminLoggedIn")).toBe("true");
      expect(mockNavigate).toHaveBeenCalledWith("/admin");
    });
  });
});  