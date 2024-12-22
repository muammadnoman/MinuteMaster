///<reference types = "cypress" />

import { LoginPage } from "../PageObjects/LoginPage"
import { BookCasePage } from "../PageObjects/BookCasePage"
import { ReusableCode } from "../support/ReusableCode"

const loginPage = new LoginPage
const bookCasePage = new BookCasePage
const reusableCode = new ReusableCode

describe(' Give Permission only for as Reader', () => {

  const loginEmail = Cypress.config('users').userAdmin.username
  const loginPassword = Cypress.config('users').userAdmin.password

  beforeEach(() => {
    cy.visit('/')
  })
  xit("give write    ", () => {
    loginPage.login(loginEmail, loginPassword)

    //people mode
    cy.get('a[data-sentry-element="RouterLink"]').eq(1).should('be.visible').click()
    cy.get('div[class="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-colorPrimary MuiInputBase-formControl MuiInputBase-adornedStart MuiInputBase-adornedEnd css-y2aid5"]')
      .type('qatesthub2@maildrop.cc').wait(2000)
    cy.get('.nameCell.MuiDataGrid-cell.MuiDataGrid-cell--textLeft.MuiDataGrid-withBorderColor').should('be.visible').click()
    cy.get('.text-4xl.text-primary-mm').should('be.visible').and('contain.text', 'User Settings')
    //cy.get('input[aria-label="Enable user credential access"]').should('be.checked')  
    //cy.get('input[aria-label="Enable Azure Single Sign-On"]').should('be.checked')
    //cy.scrollTo('bottom')
    cy.contains('User Administrator ').should('contain', 'User Administrator')
    cy.get("input[name='UA']")
      .then(($toggle) => {
        // Check if the toggle is checked (on)
        if ($toggle.prop('checked') === false) {
          // If toggle is off, click to turn it on
          cy.wrap($toggle).click();
        }
      });
    cy.get("input[name='UA']").should('be.checked');

    cy.get('table[data-sentry-source-file="Access.tsx"] tr td:nth-child(1)').contains('01010 Hussain').parents('tr').find('td:nth-child(2) input[type="checkbox"]').should('exist').check({ force: true })

    /*cy.get('body > div:nth-child(1) > main:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2) > span:nth-child(1) > input:nth-child(1)')
    .then(($checkbox) => {
      // Check if the checkbox is already checked
      if (!$checkbox.prop('checked')) {
        // If it is not checked, check it
        cy.wrap($checkbox).check();
      }
    });*/
    //save button
    cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.MuiButton-colorPrimary.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.MuiButton-colorPrimary.css-4ux7kc').click()

  })
  xit('Give rigts of admin for Reader and Administrator only', () => {
    loginPage.login(loginEmail, loginPassword)

    //peope mode

    cy.get('a[data-sentry-element="RouterLink"]').eq(1).should('be.visible').click()
    cy.get('div[class="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-colorPrimary MuiInputBase-formControl MuiInputBase-adornedStart MuiInputBase-adornedEnd css-y2aid5"]')
      .type(' noman.chaudhry@maildrop.cc').wait(2000)
    cy.get('.nameCell.MuiDataGrid-cell.MuiDataGrid-cell--textLeft.MuiDataGrid-withBorderColor').should('be.visible').click()
    cy.get('.text-4xl.text-primary-mm').should('be.visible').and('contain.text', 'User Settings')
    //cy.get('input[aria-label="Enable user credential access"]').should('be.checked')  
    //cy.get('input[aria-label="Enable Azure Single Sign-On"]').should('be.checked')
    //cy.scrollTo('bottom')
    cy.contains('User Administrator ').should('contain', 'User Administrator')
    /*cy.get("input[name='UA']") // Replace with your actual selector
  .then(($toggle) => {
    // Check if the toggle is checked (on)
    if ($toggle.prop('checked') === false) {
      // If toggle is off, click to turn it on
      cy.wrap($toggle).click({force:true});
    }
  });*/
    cy.get("input[name='UA']").should('be.checked');
    //save button

    cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.MuiButton-colorPrimary.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.MuiButton-colorPrimary.css-4ux7kc').click()
  })
  xit('validat that user have only assigned write ', () => {
    loginPage.login('noman.chaudhry@maildrop.cc', 'qwertY12#')
    cy.get('class="text-[0.65rem] truncate font-normal text-primary-mm w-52 opacity-70"').should('contain.text', 'Reader (R)')
  })
  xit('validate 2nd iuser hve only given rights', () => {
    loginPage.login('qatesthub2@maildrop.cc')
    cy.get("p[aria-label='Reader (R), Pack Manager (PM), User Administrator (UA)']").should('have.text', 'Reader (R), Pack Manager (PM), User Administrator (UA)')
  })
})