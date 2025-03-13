import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom"; // Import useNavigate here
import RegisterPage from "../components/RegisterPage.jsx";

// Mock useNavigate hook from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(), // Mocking useNavigate here
}));

describe("RegisterPage", () => {
  let mockNavigate;

  beforeEach(() => {
    global.alert = jest.fn();
    mockNavigate = jest.fn();  // Create the mock function
    useNavigate.mockReturnValue(mockNavigate);  // Mock the return value of useNavigate
    render(
      <Router>
        <RegisterPage />
      </Router>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("shows alert with user name and email after successful registration", () => {
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: "Yeshas" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "thor.yeshas@gmail.com" } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: "password123" } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm your password/i), { target: { value: "password123" } });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    // Check if alert is called
    expect(global.alert).toHaveBeenCalledWith("Registered with name: Yeshas, email: thor.yeshas@gmail.com");

    // Check if navigate is called to redirect to login page
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});

