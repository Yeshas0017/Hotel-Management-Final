describe('Booking Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/booking'); //url
  });

  it('should validate the phone number to be 10 digits only', () => {
    cy.get('input[name="phone"]').as('phoneInput');
    
    
    cy.get('@phoneInput').type('12345678901234');
    cy.get('@phoneInput').should('have.value', '1234567890');

    
    cy.get('@phoneInput').clear().type('123-456-7890');
    cy.get('@phoneInput').should('have.value', '1234567890'); 

    
    cy.get('@phoneInput').clear().type('9876543210');
    cy.get('@phoneInput').should('have.value', '9876543210'); // 10 no
  });

  it('should only allow letters and spaces for the card name', () => {
    cy.get('input[name="cardName"]').as('cardNameInput');

    
    cy.get('@cardNameInput').type('yeshas123 murthy!');
    cy.get('@cardNameInput').should('have.value', 'yeshas murthy'); 

    
    cy.get('@cardNameInput').clear().type('yeshas murthy');
    cy.get('@cardNameInput').should('have.value', 'yeshas murthy'); 
  });

  it('should validate First Name, Last Name, Email, Check-In, Check-Out, Card Number, and CVV', () => {
    
    cy.get('input[name="firstName"]').type('yeshas'); // First Name
    cy.get('input[name="lastName"]').type('murthy'); // Last Name
    cy.get('input[name="email"]').type('yeshas.murthy@gmail.com'); // Email
    cy.get('input[name="checkIn"]').type('2025-03-10'); // Check-In Date
    cy.get('input[name="checkOut"]').type('2025-03-12'); // Check-Out Date
    cy.get('input[name="cardNumber"]').type('1234567812345678'); // Card Number
    cy.get('input[name="cvv"]').type('123'); // CVV

    
    cy.get('input[name="firstName"]').should('have.value', 'yeshas');
    cy.get('input[name="lastName"]').should('have.value', 'murthy');
    cy.get('input[name="email"]').should('have.value', 'yeshas.murthy@gmail.com');
    cy.get('input[name="checkIn"]').should('have.value', '2025-03-10');
    cy.get('input[name="checkOut"]').should('have.value', '2025-03-12');
    cy.get('input[name="cardNumber"]').should('have.value', '1234567812345678');
    cy.get('input[name="cvv"]').should('have.value', '123');
  });

  it('should display an alert if the form is submitted with missing room selection', () => {
    cy.get('button[type="submit"]').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Please select a room type.');
    });
  });

 
  it('should display an alert if the form is submitted with missing room selection', () => {
    cy.window().then((window) => {
      cy.stub(window, 'alert').callsFake((alertText) => {
        expect(alertText).to.contains('Please select a room type.');
      });
    });
  
    cy.get('button[type="submit"]').click(); 
  });
});

describe('Booking Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/booking'); 
  });

  it('should validate the phone number to be 10 digits only', () => {
    cy.get('input[name="phone"]').as('phoneInput');
    
    
    cy.get('@phoneInput').type('12345678901234');
    cy.get('@phoneInput').should('have.value', '1234567890'); 

    
    cy.get('@phoneInput').clear().type('123-456-7890');
    cy.get('@phoneInput').should('have.value', '1234567890'); 

    
    cy.get('@phoneInput').clear().type('9876543210');
    cy.get('@phoneInput').should('have.value', '9876543210'); 
  });

  it('should only allow letters and spaces for the card name', () => {
    cy.get('input[name="cardName"]').as('cardNameInput');

    
    cy.get('@cardNameInput').type('yeshas123 murthy!');
    cy.get('@cardNameInput').should('have.value', 'yeshas murthy'); 

    
    cy.get('@cardNameInput').clear().type('yeshas murthy');
    cy.get('@cardNameInput').should('have.value', 'yeshas murthy'); 
  });

  it('should validate all form fields with valid data', () => {
    
    cy.get('input[name="firstName"]').type('yeshas');
    cy.get('input[name="lastName"]').type('murthy');
    cy.get('input[name="email"]').type('yeshas.murthy@gmail.com');
    cy.get('input[name="checkIn"]').type('2025-03-10');
    cy.get('input[name="checkOut"]').type('2025-03-12');
    cy.get('input[name="cardNumber"]').type('1234567812345678');
    cy.get('input[name="cvv"]').type('123');

    
    cy.get('input[name="firstName"]').should('have.value', 'yeshas');
    cy.get('input[name="lastName"]').should('have.value', 'murthy');
    cy.get('input[name="email"]').should('have.value', 'yeshas.murthy@gmail.com');
    cy.get('input[name="checkIn"]').should('have.value', '2025-03-10');
    cy.get('input[name="checkOut"]').should('have.value', '2025-03-12');
    cy.get('input[name="cardNumber"]').should('have.value', '1234567812345678');
    cy.get('input[name="cvv"]').should('have.value', '123');
  });

  it('should display an alert if the form is submitted with missing room selection', () => {
    
    cy.window().then((window) => {

      cy.stub(window, 'alert').callsFake((alertText) => {

        expect(alertText).to.contains('Please select a room type.');
      });
    });

  
    cy.get('button[type="submit"]').click();
  });



  
});
