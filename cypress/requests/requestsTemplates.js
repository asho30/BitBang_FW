let user = require('../fixtures/user')

let signUp = {
    "operationName": "SignUp",
    "variables": {
        "input": {
            "phone": user.phone
        }
    },
    "query": "mutation SignUp($signUpInput: signUpInputDto!) {signUp(signUpInput: $signUpInput)}"
}

let signIn = {
    "operationName": "SignIn",
    "variables": {
        "input": {
            "phone": user.phone
        }
    },
    "query": "mutation SignIn($signInInput: SignInInputDto!) {signIn(signInInput: $signInInput)}"
}

module.exports = {
    signIn,
    signUp
}