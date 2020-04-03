const express = require('express');
const router = express.Router();
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');


router.post('/register', (req, res) => {
    const {err, isValid} = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(err);
    }

    User.findOne({email: req.body.email})
        .then( user => {
            if (user) {
                err.email = 'There is an account associated with that Email'
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                })
            }
        })
})

router.post('/login', (req, res) => {
    const { err, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(err);
    }

    User.findOne({email})
        .then(user => {
            if(!user){
                err.email = 'User not found';
                return res.status(404).json(err)
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        res.json({msg: 'Sucessfully Logged In!'})
                    } else {
                        err.password = 'Incorrect Password'
                        return res.status(400).json(err)
                    }
                })
        })
})

router.get("/test", (req, res) => res.json({
    msg: "This is the users route"
}));

module.exports = router;

