import { LoginPage } from '../pages/loginPage'
import { HomePage } from '../pages/homePage'

const loginPage = new LoginPage()
const homePage = new HomePage()
const loginUser = {
  phoneNumber: Cypress.env('phoneNumber'),
  superOTP: Cypress.env('superOTP')
}

context('Sign In To Amplifidor', () => {
  before(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'))
  })

  it('Login by valid user', () => {
    loginPage.login(loginUser.phoneNumber)
    //homePage.isLoggedIn()
  })
})