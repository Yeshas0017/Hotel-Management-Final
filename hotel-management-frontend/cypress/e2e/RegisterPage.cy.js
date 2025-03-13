describe("Register Page", () => {
  beforeEach(() => {
    
    cy.visit("http://localhost:5173/register"); 
  })

  it("should display the register form", () => {
    
    cy.get("h2").contains("Register");
    cy.get("input#name").should("be.visible");
    cy.get("input#email").should("be.visible");
    cy.get("input#password").should("be.visible");
    cy.get("input#confirm-password").should("be.visible");
    cy.get("button.register-button").should("be.visible");
  });

  it("should show an alert if passwords do not match", () => {
    
    cy.get("input#name").type("Yeshas murthy");
    cy.get("input#email").type("yeshas.nm@gmail.com");
    cy.get("input#password").type("password123");
    cy.get("input#confirm-password").type("password456");

    // Submit the form
    cy.get("button.register-button").click();

    // Check that the alert is shown
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("Passwords do not match!");
    });
  });

  it("should redirect to the login page after successful registration", () => {
    // Enter valid details for registration
    cy.get("input#name").type("Yeshas murthy");
    cy.get("input#email").type("yeshas.nm@gmail.com.com");
    cy.get("input#password").type("password123");
    cy.get("input#confirm-password").type("password123");

    // Submit the form
    cy.get("button.register-button").click();

    // Check that the user is redirected to the login page
    cy.url().should("include", "/login");
  });

  it("should contain a link to the login page", () => {
    // Check if the login link is present
    cy.get(".login-link a").contains("Login");
  });
});
