const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    rental_id: {
        type: Schema.Types.ObjectId,
        ref: 'rentals'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    status: {
        type: String,
        default: "Pending",
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
        unique: true,
    },
    endDate: {
        type: Date,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = Bookings = mongoose.model("bookings", BookingSchema);
