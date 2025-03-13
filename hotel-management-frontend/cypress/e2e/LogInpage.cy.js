describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login'); 
    cy.wait(1000);  
  });

  it('should display the login form', () => {
    cy.get('h2').should('contain', 'Login');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Login');
    cy.wait(1000);  
  });
  it('should successfully log in and redirect to booking page', () => {
    const validEmail = 'suhas@gmail.com';
    const validPassword = 'password123';

    cy.get('input[type="email"]').type(validEmail);
    cy.get('input[type="password"]').type(validPassword);
    cy.get('button[type="submit"]').click();

    // Check if alert for login success is shown
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Login successful! Redirecting to Booking Page...');
    });

    // Check if redirected to the booking page
    cy.url().should('include', '/booking');
    cy.wait(1000);  
  });

  it('should show an alert when email or password is missing', () => {
    // Missing password case
    cy.get('input[type="email"]').type('suhasr@gmail.com');
    cy.get('button[type="submit"]').click();
  
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Please enter email and password.');
    });
  
    // Clear email before next check
    cy.get('input[type="email"]').clear();
  
    // Missing email case
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();
  
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Please enter email and password.');
    });
    // Now try with password only
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Please enter email and password.');
      cy.wait(1000);  
    });
  });

  it('should navigate to the Register page when Register link is clicked', () => {
    cy.get('.register-link').click();

    // Check if the URL contains '/register'
    cy.url().should('include', '/register');
  });

  it('should trigger Forgot Password alert', () => {
    cy.get('.forgot-password').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Coming soon!');
  
    });
  });
  
});
