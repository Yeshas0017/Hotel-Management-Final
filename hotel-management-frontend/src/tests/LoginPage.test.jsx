import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from '../components/LoginPage.jsx'; // Adjust the path based on your project structure

describe('LoginPage', () => {
  // Mocking alert in the test
  beforeEach(() => {
    global.alert = jest.fn(); // Mock the alert function
  });

  afterEach(() => {
    jest.resetAllMocks();  // Clean up mocks after each test
  });

  test('shows alert for forgot password', () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.click(screen.getByText(/Forgot Password\?/i));
    expect(global.alert).toHaveBeenCalledWith('Coming soon!');
  });

  // Other tests go here...
});
