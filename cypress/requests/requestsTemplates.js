let networker = require('../fixtures/networker.js')

let signUp = {
    "operationName": "SignUp",
    "variables": {
        "input": {
            "phone": ""
        }
    },
    "query": "mutation SignUp($signUpInput: signUpInputDto!) {signUp(signUpInput: $signUpInput)}"
}

let signIn = {
    "operationName": "SignIn",
    "variables": {
        "input": {
            "phone": ""
        }
    },
    "query": "mutation SignIn($signInInput: SignInInputDto!) {signIn(signInInput: $signInInput)}"
}

module.exports = {
    signIn,
    signUp
}
