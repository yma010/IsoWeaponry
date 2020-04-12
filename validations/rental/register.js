const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateNewProduct(data) {
    let err = {};

    data.model = validText(data.model) ? data.model : ' ';
    data.category = validText(data.category) ? data.category : ' ';

    if(Validator.isEmpty(data.model)) {
        err.model = 'Please provide the model name';
    }
    if(Validator.isEmpty(data.category)) {
        err.category = 'Please select a category';
    }
    if(Validator.isEmpty(data.price)) {
        err.price = 'Please provide the price';
    }
    if(Validator.isEmpty(data.weight)) {
        err.weight = 'Please provide the weight';
    }
    if(Validator.isEmpty(data.length)) {
        err.length = 'Please provide the length';
    }

    return {
        err,
        isValid: Object.keys(err).length === 0,
    };
};