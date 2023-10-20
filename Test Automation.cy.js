// Tests automation for 'https://saucedemo.com/'
describe('Tests Automation for saucedemo.com', () => {

    // 1. Login Test with incorrect username or password (check for error message)
    it('should display an error message for incorrect username and password', () => {

      cy.visit('https://www.saucedemo.com/');
 
      // Enter incorrect username and password
      cy.get('#user-name').type('incorrectUsername');
      cy.get('#password').type('incorrectPassword');
  
      // Click the login button
      cy.get('#login-button').click();

      cy.wait(5000);
  
      // Verify error message is displayed
      cy.get('[data-test="error"]')
        .should('be.visible')
        .and('contain', 'Username and password do not match any user in this service');
    });



  // 2. Login Test with the standard username (verify if you are logged in afterward)
  it('should successfully login with standard user', () => {
    cy.visit('https://www.saucedemo.com/');

    // Enter username and password for standard user
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Verify successful login and redirection
    cy.url().should('include', '/inventory.html');
  })


// 3. Logout Test (you need to be logged in before you can log out - after logging in, there is a menu in the upper left corner that includes logout)
  it('should successfully log out after logging in', () => {
    cy.visit('https://www.saucedemo.com/');

    // Log in with standard user
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Verify successful login
    cy.url().should('include', '/inventory.html');

    // Open menu and click logout
    cy.get('.bm-burger-button').click();
    cy.get('#logout_sidebar_link').click();

    // Verify login form is visible
    cy.get('#login-button').should('be.visible');
  })


// 4. Test to open and close the side menu
  it('should open and close the side menu', () => {
    cy.visit('https://www.saucedemo.com/');

 // Log in with standard user
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Open menu
    cy.get('.bm-burger-button').click();
    
    // Verify menu is visible
    cy.get('.bm-menu-wrap').should('be.visible');

    // Close menu
    cy.get('.bm-cross-button').click();

    // Verify menu is not visible
    cy.get('.bm-menu-wrap').should('not.be.visible');
  })


// 5. Test to add a product to the cart Test (add the product to the cart and verify if it has been added)
  it('should add a product to the cart', () => {
    cy.visit('https://www.saucedemo.com/');

    // Log in with standard user
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Add a product to the cart
    cy.get('.btn_primary').first().click();

    // Verify the product is added to the cart
    cy.get('.shopping_cart_badge').should('contain', '1');
  })


// 6. Test to delete a product from the cart Test (check if the product has disappeared or the cart is empty)
  it('should remove a product from the cart', () => {
    cy.visit('https://www.saucedemo.com/');

    // Log in with standard user
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Add a product to the cart
    cy.get('.btn_primary').first().click();

    // Remove the product from the cart
    cy.get('.shopping_cart_link').click();
    cy.get('#remove-sauce-labs-backpack').click();

    // Verify the cart is empty
    cy.get('.shopping_cart_badge').should('not.exist');
  })


// 7. Test to check if you can place an order for a product (add a product to the cart and then follow all the checkout steps until placing the order)
  it('should successfully complete the checkout process', () => {
    cy.visit('https://www.saucedemo.com/');

    // Log in with standard user
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Add a product to the cart
    cy.get('.btn_primary').first().click();

    // Go to the shopping cart
    cy.get('.shopping_cart_badge').click();

    // Proceed to checkout
    cy.get('#checkout').click();

    // Fill in checkout information
    cy.get('#first-name').type('John');
    cy.get('#last-name').type('Doe');
    cy.get('#postal-code').type('12345');
    cy.get('#continue').click();

    // Complete the purchase
    cy.get('#finish').click();

    // Verify successful order placement
    cy.get('.complete-header').should('contain', 'Thank you for your order!');
  })


// 8. Test to check if you can access the page with the details of a product (the page that appears when you click on a product)
  it('should navigate to the product details page', () => {
    cy.visit('https://www.saucedemo.com/');

    // Log in with standard user
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Click on a product to view details
    cy.get('#item_4_title_link').click();

    // Verify navigation to the product details page
    cy.url().should('include', '/inventory-item.html');
  })


// 9. Test if the "Back to products" button on a product page takes you to the main page
  it('should navigate back to the main products page', () => {
    cy.visit('https://www.saucedemo.com/');

    // Log in with standard user
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Click on a product to view details
    cy.get('#item_4_title_link').click();

    // Click on "Back to products" button
    cy.get('#back-to-products').click();

    // Verify navigation back to the main products page
    cy.url().should('include', '/inventory.html');
    // You may want to add additional assertions based on the structure of the main products page
  })
})