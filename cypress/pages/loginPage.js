import "../support/commands"

export class LoginPage {
    constructor() {
        this.selector = {
            phoneNumberInput: "input[name='mobile_no']",
            submitButton: "button[type='submit']"
        };
    }

    login(phoneNumber) {
        cy.getLocator(this.selector.phoneNumberInput).clear().type(phoneNumber)
        cy.getLocator(this.selector.submitButton).click()
    }
}