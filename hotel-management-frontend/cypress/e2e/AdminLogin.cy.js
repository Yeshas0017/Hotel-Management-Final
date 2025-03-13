describe('Admin Login', () => {
  it('should log in successfully with valid credentials and redirect to the admin page', () => {
    
    cy.visit('http://localhost:5173/admin-login'); 

  
    cy.get('input[type="text"]').clear().type('admin'); // enter username
    cy.get('input[type="password"]').clear().type('admin123'); // enter password

    
    cy.get('button[type="submit"]').click();

    
    cy.url().should('include', '/admin'); // check if redirected to /admin
  });

  it('should show an alert for invalid credentials', () => {
 
    cy.visit('http://localhost:5173/admin-login'); 

    // give invalid data
    cy.get('input[type="text"]').clear().type('wronguser'); 
    cy.get('input[type="password"]').clear().type('wrongpass'); 

    // click the login button
    cy.get('button[type="submit"]').click();

    
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Invalid credentials!');
    });
  });
});
