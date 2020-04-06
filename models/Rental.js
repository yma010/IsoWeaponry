const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RentalSchema = new Schema({
    model: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        default: 0,
        required: true,
    },
    length: {
        type: Number,
        default: 0,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    picture: [{
        type: String,
    }],
    booking_id: {
        type: Schema.Types.ObjectId,
        ref: 'bookings'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'admin'
    }
})

module.exports = Rental = mongoose.model('Rental', RentalSchema);