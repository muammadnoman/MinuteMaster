///<reference types = "cypress" />

import { LoginPage } from "../PageObjects/LoginPage"
import { BookCasePage } from "../PageObjects/BookCasePage"
import { ReusableCode } from "../support/ReusableCode"

const loginPage = new LoginPage
const bookCasePage = new BookCasePage
const reusableCode = new ReusableCode

describe('Create Minutes of Meetings flow Test cases', () => {
  const loginEmail = Cypress.config('users').user1.username
  const loginPassword = Cypress.config('users').user1.password

  beforeEach(() => {
    loginPage.login(loginEmail, loginPassword)
  })
  it('TC_MM_01 - Produce and validate minutes of meetings from Transcript using text instructions', () => {
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
    const agendaItem1 = ('AgendaItem_' + reusableCode.generateRandomString(4))
    const agendaOwner = 'Noman'
    const duration = '55' //min
    bookCasePage.addAgendaItem(agendaItem1, agendaOwner, duration)
    const agendaItem2 = ('AgendaItem_' + reusableCode.generateRandomString(4))
    bookCasePage.addAgendaItem(agendaItem2, agendaOwner, duration)
    const agendaItem3 = ('AgendaItem_' + reusableCode.generateRandomString(4))
    bookCasePage.addAgendaItem(agendaItem3, agendaOwner, duration)
    //Add Recipient and publish agenda
    const recipient = 'Noman Chaudhry'
    const recipientNote = 'Testing Recipient Notes'
    bookCasePage.publishAgenda(recipient, recipientNote)
    cy.verifyToast('Pack published successfully')
    cy.reload()
    //Produce Meeting Minutes using text instructions
    bookCasePage.selectBookCase(bookCaseName)
    bookCasePage.selectAgenda(bookShelfName, agendaTitle)
    const instruction = `What is AI? \n How is beneficial? \n How it effects the World?`  //Text
    bookCasePage.produceMinutesFromTranscriptText(agendaTitle, instruction)
    //Archive created Agenda after producing minutes
    bookCasePage.selectBookCase(bookCaseName)
    bookCasePage.selectAgenda(bookShelfName, agendaTitle)
    bookCasePage.archiveAgenda(agendaTitle)
  })
  it('TC_MM_02 - Produce and validate minutes of meetings from Transcript using docx File', () => {
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
    //Produce Meeting Minutes using text instructions
    bookCasePage.selectBookCase(bookCaseName)
    bookCasePage.selectAgenda(bookShelfName, agendaTitle)
    const file = 'files/Minute Master.docx'
    bookCasePage.produceMinutesFromTranscriptFile(agendaTitle, file)
    //Archive created Agenda after producing minutes
    bookCasePage.selectBookCase(bookCaseName)
    bookCasePage.selectAgenda(bookShelfName, agendaTitle)
    bookCasePage.archiveAgenda(agendaTitle)
  })
  it('TC_MM_03 - Produce and validate minutes of meetings from Transcript using txt File', () => {
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
    //Produce Meeting Minutes using text instructions
    bookCasePage.selectBookCase(bookCaseName)
    bookCasePage.selectAgenda(bookShelfName, agendaTitle)
    const file = 'files/Minute Master.txt'
    bookCasePage.produceMinutesFromTranscriptFile(agendaTitle, file)

    //Archive created Agenda after producing minutes
    bookCasePage.selectBookCase(bookCaseName)
    bookCasePage.selectAgenda(bookShelfName, agendaTitle)
    bookCasePage.archiveAgenda(agendaTitle)
  })
  it('TC_MM_04 - Produce and validate minutes of meetings using meeting Recording', () => {
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
    //Produce Meeting Minutes using text instructions
    bookCasePage.selectBookCase(bookCaseName)
    bookCasePage.selectAgenda(bookShelfName, agendaTitle)
    const file = 'files/Minute Master.docx'
    bookCasePage.produceMinutesFromRecording(agendaTitle, file)

    //Archive created Agenda after producing minutes
    bookCasePage.selectBookCase(bookCaseName)
    bookCasePage.selectAgenda(bookShelfName, agendaTitle)
    bookCasePage.archiveAgenda(agendaTitle)

  })
  it('TC_MM_05 - Validate Generate a Simple Template from Agenda Only', () => {
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
    //Produce Meeting Minutes using text instructions
    bookCasePage.selectBookCase(bookCaseName)
    bookCasePage.selectAgenda(bookShelfName, agendaTitle)
    bookCasePage.produceTemplateFromAgendaOnly(agendaTitle)

    //Archive created Agenda after producing minutes
    bookCasePage.selectBookCase(bookCaseName)
    bookCasePage.selectAgenda(bookShelfName, agendaTitle)
    bookCasePage.archiveAgenda(agendaTitle)
  })
  it('TC_MM_06 - Produce and validate minutes of meetings Start with a Blank Canvas', () => {
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
    //Produce Meeting Minutes using text instructions
    bookCasePage.selectBookCase(bookCaseName)
    bookCasePage.selectAgenda(bookShelfName, agendaTitle)
    bookCasePage.startWithBlankCanvas(agendaTitle)
    //Archive created Agenda after producing minutes
    bookCasePage.selectBookCase(bookCaseName)
    bookCasePage.selectAgenda(bookShelfName, agendaTitle)
    bookCasePage.archiveAgenda(agendaTitle)
  })
})

