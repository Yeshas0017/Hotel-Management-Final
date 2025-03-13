
describe('Confirmation Page', () => {
  beforeEach(() => {
    // mock booking data in localStorage 
    const mockBooking = {
      id: Date.now(),
      firstName: 'yeshas',
      lastName: 'murthy',
      email: 'yeshas.murthy@gmail.com',
      phone: '9876543210',
      selectedRoom: 'Deluxe Room',
      price: '$200',
      checkIn: '2025-03-10',
      checkOut: '2025-03-12',
      guests: 2,
    };

    // Mock the latest booking in localStorage
    cy.window().then((window) => {
      window.localStorage.setItem('latestBooking', JSON.stringify(mockBooking));
    });

    // Visit the confirmation page
    cy.visit('http://localhost:5173/confirmation');
  });

  it('should display booking details correctly', () => {
    
    cy.contains('Booking Confirmed! 🎉');
    cy.get('.booking-details')
      .should('contain', 'Booking ID:')
      .and('contain', 'Guest Name:')
      .and('contain', 'Email:')
      .and('contain', 'Phone:')
      .and('contain', 'Room:')
      .and('contain', 'Price:')
      .and('contain', 'Check-In:')
      .and('contain', 'Check-Out:')
      .and('contain', 'Guests:');
    
    
    cy.get('.booking-details').should('contain', 'yeshas');
    cy.get('.booking-details').should('contain', 'yeshas.murthy@gmail.com');
    cy.get('.booking-details').should('contain', '9876543210');
    cy.get('.booking-details').should('contain', 'Deluxe Room');
    cy.get('.booking-details').should('contain', '$200');
    cy.get('.booking-details').should('contain', '2025-03-10');
    cy.get('.booking-details').should('contain', '2025-03-12');
    cy.get('.booking-details').should('contain', '2');
  });
  it('should check if Download Receipt button exists and is clickable', () => {
    // Check that the "Download Receipt (PDF)" button exists
    cy.get('button').contains('Download Receipt (PDF)').should('exist'); // Find button by text
    
    // Optionally, you can check if the button is clickable (visible and enabled)
    cy.get('button').contains('Download Receipt (PDF)').should('be.visible').and('not.be.disabled');
  });
  



  it('should navigate to the booking page when clicking "Make Another Booking"', () => {
    cy.get('button').contains('Make Another Booking').click();
    cy.url().should('include', '/booking'); 
  });

  it('should navigate to the edit booking page when clicking "Edit Booking"', () => {
    cy.get('button').contains('Edit Booking').click();
    cy.url().should('include', '/edit-booking'); 
  });

  it('should handle the case where no booking data is found', () => {
    // Remove the latest booking from localStorage to to check for  no booking is found
    cy.window().then((window) => {
      window.localStorage.removeItem('latestBooking');
    });

    
    cy.visit('http://localhost:5173/confirmation'); 

    // see an alert and be redirected to the booking page
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('No recent booking found. Redirecting to booking page.');
    });

    cy.url().should('include', '/booking'); 
  });
  it('should not display "Download Receipt (PDF)" button if no booking data exists', () => {
    
    cy.window().then((window) => {
      window.localStorage.removeItem('latestBooking');
    });
  
    
    cy.visit('http://localhost:5173/confirmation');
  
  
    cy.get('button').contains('Download Receipt (PDF)').should('not.exist');
  });
  
});  