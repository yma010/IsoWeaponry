const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');

const Rentals = require('../../models/Rental');

router.get("/test", (req, res) => res.json({
    msg: "This is the rentals route"
}));

router.get('/index', (req, res) => {
    Rentals.find()
        .then(
            rentals => {
                const rentalsObj = {};
                rentals.forEach(rental =>
                    rentalsObj[rental._id] = rental
                );
                return res.json(rentalsObj)
            }
        )
})
module.exports = router;