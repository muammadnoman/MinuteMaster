
/// <reference types = "cypress"/>

import { LoginPage } from "../PageObjects/LoginPage"

const loginPage = new LoginPage

describe('Login Test cases', () => {
  const loginEmail = Cypress.config('users').user1.username
  const loginPassword = Cypress.config('users').user1.password
  beforeEach(() => {

  })
  it('TC_LOGIN_001 - Successful Login using valid credentials', () => {
    loginPage.login(loginEmail, loginPassword)
    cy.url().should('include', '/bookcase')
    cy.get('img').should('be.visible') //logo image
  })
  it('TC_LOGIN_002 - Login attempt with empty fields', () => {
    loginPage.login(null, null) //Without entering email and password
    loginPage.validateError('Please enter a valid email address', 0) //1st field error
    loginPage.validateError('Password is required!', 1) //2nd field error
  })
  it('TC_LOGIN_003 - Login attempt with Incorrect Email', () => {
    loginPage.login('incorrectEmail@yopmail.com', loginPassword)
    cy.verifyToast('We could not find a user matching the provided details')
  })
  it('TC_LOGIN_004 - Login attempt using Incorrect Password', () => {
    loginPage.login(loginEmail, 'incorrectPassword')
    cy.verifyToast('Invalid password')
  })
  it('TC_LOGIN_005 - Login attempt with invalid Email', () => {
    loginPage.login('invalidEmail', loginPassword)
    loginPage.validateError('Please enter a valid email address', 0) //1st field error
  })
})