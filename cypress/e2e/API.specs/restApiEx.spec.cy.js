import { LoginPage } from '../../pages/loginPage'
import { HomePage } from '../../pages/homePage'

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
    //cy.visit(Cypress.env('baseUrl'))
  })

  it('should return a list with all users', () => {
    cy.request({
      method: 'GET',
      url: 'https://serverest.dev/usuarios'
    }).then((response) => {
          cy.log(JSON.stringify(response.body))
          expect(response.status).to.eq(200)
      })
  })
})