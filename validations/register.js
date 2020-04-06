const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {
    let err = {};


    data.fName = validText(data.fName) ? data.fName : ' ';
    data.lName = validText(data.lName) ? data.lName : ' ';
    data.email = validText(data.email) ? data.email : ' ';
    data.password1 = validText(data.password1) ? data.password1 : ' ';
    data.password2 = validText(data.password2) ? data.password2 : ' ';

    if (Validator.isEmpty(data.fName)) {
        err.name = 'Please enter your first name'
    }
    if (Validator.isEmpty(data.lName)) {
        err.name = 'Please enter your last name'
    }
    if (!Validator.isEmail(data.email)) {
        err.email = 'Email is invalid'
    }
    if (Validator.isEmpty(data.email)) {
        err.email = 'Email field is required'
    }
    if (Validator.isEmpty(data.password1)) {
        err.password1 = 'Password field is required'
    }
    if (Validator.isLength(data.password1, {min: 6, max: 30})){
        err.password1 = 'Password must be at least 6 characters';
    }
    if (Validator.isEmpty(data.password2)) {
        err.password2 = 'Please confirm your password'
    }
    if (!Validator.equals(data.password1, data.password2)) {
        err.password2 = 'Passwords must match'
    }

    return {
        err,
        isValid: Object.keys(err).length === 0,
    };
};