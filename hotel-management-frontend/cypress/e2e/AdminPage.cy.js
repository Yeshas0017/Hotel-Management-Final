describe('Admin Page', () => {
  beforeEach(() => {
    
    localStorage.clear();
    

    const sampleBookings = [
      { id: 1, checkIn: '2023-03-01', checkOut: '2023-03-05', guests: 2 },
      { id: 2, checkIn: '2023-04-01', checkOut: '2023-04-05', guests: 4 },
    ];
    localStorage.setItem('allBookings', JSON.stringify(sampleBookings));
    

    cy.visit('http://localhost:5173/admin');
  });

  it('should render the bookings table with the correct data', () => {
   
    cy.get('.booking-table').should('be.visible');
    
    cy.get('.booking-table tbody tr').should('have.length', 2); // Since we added 2 bookings in localStorage
    
 
    cy.get('.booking-table tbody tr').eq(0).within(() => {
      cy.get('td').eq(0).should('contain', '1'); // ID
      cy.get('td').eq(1).should('contain', '2023-03-01'); // Check-In
      cy.get('td').eq(2).should('contain', '2023-03-05'); // Check-Out
      cy.get('td').eq(3).should('contain', '2'); // Guests
    });
  });

  it('should navigate to edit booking page when clicking the "Edit" button', () => {
  
    cy.get('button').contains('Edit').first().click();
    
    
    cy.url().should('include', '/edit-booking');
    
    
    cy.window().then((window) => {
      const latestBooking = JSON.parse(window.localStorage.getItem('latestBooking'));
      expect(latestBooking.id).to.equal(1); // This should be the ID of the first booking
    });
  });

  it('should delete a booking when clicking the "Delete" button', () => {
   
    cy.get('.booking-table tbody tr').should('have.length', 2);

    
    cy.get('button').contains('Delete').first().click();

    cy.on('window:confirm', () => true); 

    // Verify that the table now only has 1 row (after deletion)
    cy.get('.booking-table tbody tr').should('have.length', 1);

    // Ensure the correct booking was deleted
    cy.get('.booking-table tbody tr').eq(0).within(() => {
      cy.get('td').eq(0).should('contain', '2'); // Now only the second booking should remain
    });
  });
});
