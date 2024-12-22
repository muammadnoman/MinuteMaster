export class LoginPage {
    login(email, password) {
        /*
        sessionStorage.clear()
        cy.clearAllCookies({ log: true })
        cy.clearAllLocalStorage('your item', { log: true })
        cy.clearAllSessionStorage()
        */
        cy.visit('/login')
        cy.get('[alt="logo"]').should('be.visible') //logo
        cy.get('h1.text-primary-mm').should('be.visible').and('contain.text', 'Login') //heading
        cy.get('[class="text-center"] p').should('be.visible').and('contain.text', 'Please enter your email and password to access your account')
        if (email != null) {
            cy.get('input[name="email"]').should('be.visible').type(email).and('contain.value', email)
        }
        if (password != null) {
            cy.get('input[name="password"]').should('be.visible').type(password).and('contain.value', password)
        }
        cy.get('[href="/reset-password"]').should('be.visible').and('contain.text', 'Forgotten your password?')
        cy.get('button[type="submit"]').should('be.visible').and('contain.text', 'Login').click() //Login
    }
    validateError(message, index) {
        cy.get('p.Mui-error').eq(index).should('be.visible').and('contain.text', message)
    }
}