/// <reference types="cypress" />

// https://www.cypress.io/
describe('Complete test suite that covers basic authentication functionalities', () => {

    // https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test

    it('should visit uobites index page', () => {
        cy.visit("http://localhost:3000", { timeout: 30000 });
    })

    it('should attempt to login with credentials that do not exist', () => {

        // https://docs.cypress.io/api/commands/visit
        cy.visit("http://localhost:3000", { timeout: 30000 });

        // https://docs.cypress.io/api/commands/should
        // https://stackoverflow.com/questions/52758491/how-do-i-get-element-type-email-using-cypress
        cy.get("[type='email']").type('fake@email.com'); // enter a fake email into the email input form
        cy.get("[type='email']").should('have.value', 'fake@email.com'); // verify that the value has been updated

        cy.get("[type='password']").type('123123123123'); // enter random password
        cy.get("[type='password']").should('have.value', '123123123123'); // verify that the value has been updated

        cy.get("[type='submit']").click(); // click submit
        cy.get("[class='fade alert alert-danger show']").contains("Wrong password or email entered").should('be.visible');

    })

    it('should click Forgot Password from the login page', () => {

        cy.visit("http://localhost:3000", { timeout: 30000 });

        cy.get("[class='register-link mt-3']").contains('Forgot Password?').click();
        cy.get("[class='modal-dialog']").should("be.visible");
        cy.get("[id='modalEmail']").type("fake@gmail.com");
        cy.get("[id='modalEmail']").should('have.value', 'fake@gmail.com');
        cy.get("[class='uottawa-modal-btn btn btn-primary']").click();
        cy.get("[class='fade alert alert-success show']").contains("Success!").should('be.visible');

    })

    it('should navigate to Register Account from the login page', () => {

        cy.visit("http://localhost:3000", { timeout: 30000 });

        cy.get("[class='register-link mt-3']").contains("Don't have an account? Register here").click();
        cy.url().should('include', '/registration'); // https://docs.cypress.io/api/commands/url

    })

    it('should attempt to create account with missing first name', () => {

        cy.visit("http://localhost:3000/registration", { timeout: 30000 });

        cy.get("[id='firstName']").should('have.value', ''); // expect empty firstName field
        
        cy.get("[id='lastName']").type("Do");
        cy.get("[id='lastName']").should('have.value', 'Do');

        cy.get("[id='email']").type("kien@uottawa.ca");
        cy.get("[id='email']").should('have.value', 'kien@uottawa.ca');

        cy.get("[id='flexCard']").type("123123123");
        cy.get("[id='flexCard']").should('have.value', '123123123');

        cy.get("[id='password1']").type("password123");
        cy.get("[id='password1']").should('have.value', 'password123');

        cy.get("[id='password2']").type("password123");
        cy.get("[id='password2']").should('have.value', 'password123');

        cy.get("[type='submit']").contains("Create account").click();
        cy.url().should('include', '/registration'); // still on the same URL, registration failed as expected
        
    })

    it('should attempt to create account with different password and confirm password values', () => {

        cy.visit("http://localhost:3000/registration", { timeout: 30000 });

        cy.get("[id='firstName']").type("Kien");
        cy.get("[id='firstName']").should('have.value', 'Kien');
        
        cy.get("[id='lastName']").type("Do");
        cy.get("[id='lastName']").should('have.value', 'Do');

        cy.get("[id='email']").type("kien@uottawa.ca");
        cy.get("[id='email']").should('have.value', 'kien@uottawa.ca');

        cy.get("[id='flexCard']").type("123123123");
        cy.get("[id='flexCard']").should('have.value', '123123123');

        cy.get("[id='password1']").type("password123");
        cy.get("[id='password1']").should('have.value', 'password123');

        cy.get("[id='password2']").type("differentPass");
        cy.get("[id='password2']").should('have.value', 'differentPass');

        cy.get("[type='submit']").contains("Create account").click();
        cy.get("[class='text-danger']").contains("Passwords do not match").should('be.visible'); // error msg should exist
        cy.url().should('include', '/registration'); // still on the same URL, registration failed as expected
        
    })

    // // TODO: Apparently this test passes... This should not pass!!!
    // it('should attempt to create account with a password less than 6 characters', () => {

    //     cy.visit("http://localhost:3000/registration", { timeout: 30000 });

    //     cy.get("[id='firstName']").type("Kien");
    //     cy.get("[id='firstName']").should('have.value', 'Kien');
        
    //     cy.get("[id='lastName']").type("Do");
    //     cy.get("[id='lastName']").should('have.value', 'Do');

    //     cy.get("[id='email']").type("as@kien.com");
    //     cy.get("[id='email']").should('have.value', 'as@kien.com');

    //     cy.get("[id='flexCard']").type("123123123");
    //     cy.get("[id='flexCard']").should('have.value', '123123123');

    //     cy.get("[id='password1']").type("123");
    //     cy.get("[id='password1']").should('have.value', '123');

    //     cy.get("[id='password2']").type("123");
    //     cy.get("[id='password2']").should('have.value', '123');

    //     cy.get("[type='submit']").contains("Create account").click();
    //     cy.get("[class='text-danger']").contains("Passwords do not match").should('be.visible'); // error msg should exist
    //     cy.url().should('include', '/registration'); // still on the same URL, registration failed as expected
        
    // })

    it('should attempt to create account that already exists', () => {

        cy.visit("http://localhost:3000/registration", { timeout: 30000 });

        cy.get("[id='firstName']").type("Kien");
        cy.get("[id='firstName']").should('have.value', 'Kien');
        
        cy.get("[id='lastName']").type("Do");
        cy.get("[id='lastName']").should('have.value', 'Do');

        cy.get("[id='email']").type("kien@uottawa.ca");
        cy.get("[id='email']").should('have.value', 'kien@uottawa.ca');

        cy.get("[id='flexCard']").type("123123123");
        cy.get("[id='flexCard']").should('have.value', '123123123');

        cy.get("[id='password1']").type("password123");
        cy.get("[id='password1']").should('have.value', 'password123');

        cy.get("[id='password2']").type("password123");
        cy.get("[id='password2']").should('have.value', 'password123');

        cy.get("[type='submit']").contains("Create account").click();
        cy.get("[class='fade alert alert-danger show']").contains("Username already exists").should('be.visible');
        cy.url().should('eq', 'http://localhost:3000/registration');

    })

    it('should create a new account with valid information', () => {

        cy.visit("http://localhost:3000/registration", { timeout: 30000 });

        cy.get("[id='firstName']").type("AUTOMATED_FIRST_NAME");
        cy.get("[id='firstName']").should('have.value', 'AUTOMATED_FIRST_NAME');
        
        cy.get("[id='lastName']").type("AUTOMATED_LAST_NAME");
        cy.get("[id='lastName']").should('have.value', 'AUTOMATED_LAST_NAME');

        cy.get("[id='email']").type("automated@test.ca");
        cy.get("[id='email']").should('have.value', 'automated@test.ca');

        cy.get("[id='flexCard']").type("999999999");
        cy.get("[id='flexCard']").should('have.value', '999999999');

        cy.get("[id='password1']").type("password123");
        cy.get("[id='password1']").should('have.value', 'password123');

        cy.get("[id='password2']").type("password123");
        cy.get("[id='password2']").should('have.value', 'password123');

        cy.get("[type='submit']").contains("Create account").click();
        cy.url().should('eq', 'http://localhost:3000/');

    })

    it('should successfully login with valid credentials', () => {

        cy.visit("http://localhost:3000", { timeout: 30000 });

        cy.get("[type='email']").type('kien@uottawa.ca');
        cy.get("[type='email']").should('have.value', 'kien@uottawa.ca');

        cy.get("[type='password']").type('ABCD1234');
        cy.get("[type='password']").should('have.value', 'ABCD1234');

        cy.get("[type='submit']").click(); // click submit
        cy.url().should('include', '/home'); // login successfully; navigated to view outlets page

    })

})
