const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {
    let err = {};

    data.email = validText(data.email) ? data.email : ' ';
    data.password = validText(data.password) ? data.password : ' ';

    if (Validator.isEmail(data.email)) {
        err.email = 'Email is invalid'
    }
    if (Validator.isEmpty(data.email)) {
        err.email = 'Email field is required'
    }
    if (Validator.isEmpty(data.password)) {
        err.password = 'Password field is required'
    }

    return {
        err,
        isValid: Object.keys(err).length === 0,
    };
};