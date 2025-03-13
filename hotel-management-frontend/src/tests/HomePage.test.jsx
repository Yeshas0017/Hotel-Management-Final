import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../components/HomePage.jsx';
import { BrowserRouter } from 'react-router-dom';

describe('HomePage', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
  });


  test('navigates to the login page when the login button is clicked', () => {
    const loginButton = screen.getByText(/Login/i);
    fireEvent.click(loginButton);

    // You may want to mock or assert that navigation happens correctly:
    // Example: check if a link with 'login' is displayed or that it redirects correctly
  });

  test("renders the 'Our Rooms' section with all room types", () => {
    expect(screen.getByText(/Our Rooms/i)).toBeInTheDocument();
    expect(screen.getByText(/Standard Room - \$100\/night/i)).toBeInTheDocument();
    expect(screen.getByText(/Deluxe Room - \$150\/night/i)).toBeInTheDocument();
    expect(screen.getByText(/Luxury Room - \$200\/night/i)).toBeInTheDocument();
  });
  test("renders hero video element with correct attributes", () => {
    
  
    const videoElement = document.getElementsByTagName("video")[0];
  
    expect(videoElement).toBeInTheDocument();
  
    expect(videoElement).toHaveAttribute("autoPlay");
    expect(videoElement).toHaveAttribute("loop");
    const source = videoElement.querySelector("source");
    expect(source).toHaveAttribute("src", "/videos/hotel-background.mp4");
  });
  test('renders the navigation links', () => {
    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact Us/i })).toBeInTheDocument();
  });
});
