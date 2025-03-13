describe('Home Page Test', () => {
  
  it('Visits should the homepage and checks the title', () => {
    cy.visit('http://localhost:5173');  
    cy.wait(3000);  
    cy.title().should('include', 'Vite + React');
    cy.wait(3000);  
  });

  it('Navigates to Login page when Login button is clicked', () => {
    cy.visit('http://localhost:5173'); 
    cy.wait(2000);  
    cy.get('button.login-btn').click();  
    cy.url().should('include', '/login');  
    cy.wait(2000);  
  });

  it('Displays room information correctly', () => {
    cy.visit('http://localhost:5173');  
    cy.wait(2000);  
    cy.contains('Standard Room - $100/night').should('be.visible'); 
    cy.contains('Deluxe Room - $150/night').should('be.visible');
    cy.contains('Luxury Room - $200/night').should('be.visible');
    cy.wait(2000);  
  });

  it('Contains correct "About Us" section', () => {
    cy.visit('http://localhost:5173');
    cy.wait(2000);  
    cy.contains('About Us').should('be.visible'); 
    cy.contains('Welcome to our prestigious hotel').should('be.visible');  
    cy.wait(2000);  
  });

  it('Contains correct "Contact Us" section', () => {
    cy.visit('http://localhost:5173');
    cy.wait(2000);  
    cy.contains('Contact Us').should('be.visible');
    cy.contains('info@hotelmanagement.com').should('be.visible');
    cy.contains('Phone: +1 234 567 890').should('be.visible');
    cy.wait(2000);  
  });

  it('Navigation links should scroll to correct sections', () => {
    cy.visit('http://localhost:5173');
    cy.wait(2000);  
    cy.get('a[href="#about"]').click();
    cy.get('#about').should('be.visible'); 
    cy.wait(2000);  
    cy.get('a[href="#contact"]').click();
    cy.get('#contact').should('be.visible'); 
    cy.wait(2000);  
  });

  it('Should display room images correctly', () => {
    cy.visit('http://localhost:5173'); 
    cy.wait(2000);  
    cy.get('.room-gallery', { timeout: 6000 }).should('be.visible');
    cy.get('.room-gallery img').should('have.length.at.least', 1);
    cy.wait(2000);  
  });

  it('Footer should contain correct text', () => {
    cy.visit('http://localhost:5173');
    cy.wait(2000);  
    cy.get('.footer', { timeout: 6000 }).should('be.visible');
    cy.get('.footer').should('contain.text', '© 2025 Hotel Management. All rights reserved.');
    cy.wait(2000);  
  });

});
