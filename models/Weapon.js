const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeaponSchema = new Schema({
    model: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    length: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = Weapon = mongoose.model('Weapon', WeaponSchema);