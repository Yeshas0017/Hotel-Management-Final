describe('Edit Booking Page', () => {
  beforeEach(() => {

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

    cy.window().then((window) => {
      window.localStorage.setItem('latestBooking', JSON.stringify(mockBooking));
    });

    cy.visit('http://localhost:5173/edit-booking');
  });

  it('should load booking details from localStorage', () => {
  
    cy.get('input[name="firstName"]').should('have.value', 'yeshas');
    cy.get('input[name="lastName"]').should('have.value', 'murthy');
    cy.get('input[name="email"]').should('have.value', 'yeshas.murthy@gmail.com');
    cy.get('input[name="phone"]').should('have.value', '9876543210');
    cy.get('select[name="guests"]').should("exist").select("2").should("have.value", "2");

  });

  it('should validate the phone number to be 10 digits only', () => {
    cy.get('input[name="phone"]').as('phoneInput');
   
    cy.get('@phoneInput').clear().type('12345678901234');
    
 
    cy.get('@phoneInput').should('have.value', '1234567890'); 
  });
});

// Separate describe block for the remaining tests
describe('Booking Submission and Redirection', () => {
  beforeEach(() => {
  
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

    cy.window().then((window) => {
      window.localStorage.setItem('latestBooking', JSON.stringify(mockBooking));
    });

   
    cy.visit('http://localhost:5173/edit-booking');
  });

  

  it('should redirect to the confirmation page when save is clicked', () => {
  
    cy.get('input[name="firstName"]').clear().type('Alice');
    cy.get('input[name="lastName"]').clear().type('Brown');
    cy.get('input[name="email"]').clear().type('alice.brown@example.com');
    cy.get('input[name="phone"]').clear().type('9988776655');
    cy.get('select[name="guests"]').select("3").should("have.value", "3");


    // Submit the form (save the booking)
    cy.get('form').submit();

    cy.url().should('include', '/confirmation');
  });
  it('should allow updating booking details and save changes', () => {
    cy.get('input[name="firstName"]').clear().type('Alice');
    cy.get('input[name="lastName"]').clear().type('Brown');
    cy.get('input[name="email"]').clear().type('alice.brown@example.com');
    cy.get('input[name="phone"]').clear().type('9876543210');
    cy.get('select[name="guests"]').select('3');
    
    // Save changes
    cy.get('form').submit();
  
 
    cy.window().then((window) => {
      const updatedBooking = JSON.parse(window.localStorage.getItem('latestBooking'));
      expect(updatedBooking.firstName).to.equal('Alice');
      expect(updatedBooking.lastName).to.equal('Brown');
      expect(updatedBooking.email).to.equal('alice.brown@example.com');
      expect(updatedBooking.phone).to.equal('9876543210');
      expect(Number(updatedBooking.guests)).to.equal(3); // Convert guests to a number before comparing
    });
  
  
    cy.url().should('include', '/confirmation');
  });
  
});
describe('Edit Booking Page - Negative Test Cases', () => {
  beforeEach(() => {
    
    cy.window().then((window) => {
      window.localStorage.removeItem('latestBooking');
    });


    cy.visit('http://localhost:5173/edit-booking');
  });

  it('should redirect to booking page if no booking data is found', () => {
   
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('No booking found. Redirecting to booking page.');
    });

    cy.url().should('include', '/booking');
  });
});
