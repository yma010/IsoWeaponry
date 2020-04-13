const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateNewProduct = require('../../validations/rental/register');
const Rentals = require('../../models/Rental');
const ObjectID = require('mongodb').ObjectID;

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
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Rentals.findById(id)
        .then((rental) => {
            res.json({rental : rental})
        });
});


router.post('/register',
    passport.authenticate('jwt', {session: false}), (req,res) => {
        const { err, isValid} = validateNewProduct(req.body);
        if (!isValid) {
            return res.status(400).json(err);
        }
        const newRental = new Rental({
            model: req.body.model,
            weight: req.body.weight,
            length: req.body.length,
            price: req.body.price,
            category: req.body.category,
            picture: req.body.picture,
        });

        newRental.save()
            .then( rental => {
                return res.json({
                    rental: rental,
                })})
            .catch(
                err => console.log( err )
            )
    }
);

router.put('/edit/:id', (req, res) => {
    const rentalVal = req.body;
    const rentalId = req.body._id;
    mongoose.set('useFindAndModify', false);

    Rentals.findByIdAndUpdate(
        rentalId,
        rentalVal,
        { new: true }
    ).then(rental => res.json({
        rental: rental
    }));

})


module.exports = router;