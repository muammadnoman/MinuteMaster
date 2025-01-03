///<reference types = "cypress" />

import { LoginPage } from "../PageObjects/LoginPage"
import { BookCasePage } from "../PageObjects/BookCasePage"
import { ReusableCode } from "../support/ReusableCode"

const loginPage = new LoginPage
const bookCasePage = new BookCasePage
const reusableCode = new ReusableCode

describe('Bookcase Test cases', () => {
  const loginEmail = Cypress.config('users').user1.username
  const loginPassword = Cypress.config('users').user1.password

  beforeEach(() => {
    loginPage.login(loginEmail, loginPassword)
  })
  it('TC_BOOK_01 - Verify Creating a New Bookcase', () => {
    const bookCaseName = ('BookCase_' + reusableCode.generateRandomString(7))
    bookCasePage.createNewBookCase(bookCaseName)
    cy.verifyToast('Bookcase added successfully')
    cy.reload()
    bookCasePage.expandBookCaseMenu()
    bookCasePage.deleteBookCase(bookCaseName)
  })
  it('TC_BOOK_02 - Verify Add New Shelf', () => {
    bookCasePage.expandBookCaseMenu()
    bookCasePage.selectBookCase('BookCaseNoman')
    const bookShelfName = ('BookShelf_' + reusableCode.generateRandomString(7))
    bookCasePage.addNewShelf(bookShelfName, 'BookCaseNoman')

    //Delete New bookShelf
    bookCasePage.deleteBookShelf(bookShelfName)
  })
  it('TC_BOOK_03 - Verify Create New Agenda', () => {
    //Select Bookcase
    bookCasePage.expandBookCaseMenu()
    const bookCaseName = 'BookCaseNoman'
    bookCasePage.selectBookCase(bookCaseName)

    const bookShelfName = 'BookShelf_3884'
    const agendaTitle = ('Agenda_' + reusableCode.generateRandomString(4))
    const agendaDate = reusableCode.getFormattedDate() //Current date
    const agendaTime = '23:59'
    const meetingLink = 'https://meet.google.com/ffo-njvq-gwh'
    const agendaLocation = 'Johar Town, Lahore'
    const meetingDetail = 'Test Meeting Details'
    // Create a new Agenda
    bookCasePage.createNewAgenda(bookShelfName, agendaTitle, agendaDate, agendaTime, meetingLink, agendaLocation, meetingDetail)
    const agendaItem = ('AgendaItem_' + reusableCode.generateRandomString(4))
    const agendaOwner = 'Noman'
    const duration = '55' //min
    bookCasePage.addAgendaItem(agendaItem, agendaOwner, duration)
    //Add Recipient and publish agenda
    const recipient = 'Noman Chaudhry'
    const recipientNote = 'Testing Recipient Notes'
    bookCasePage.publishAgenda(recipient, recipientNote)
    cy.verifyToast('Pack published successfully')
    cy.reload()
    //Delete created Agenda
    bookCasePage.selectBookCase(bookCaseName)
    bookCasePage.selectAgenda(bookShelfName, agendaTitle)
    bookCasePage.deleteAgenda(agendaTitle)
  })
})