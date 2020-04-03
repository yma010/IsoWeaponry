const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const k = process.env.secretOrKey || require('../../config/keys').secretOrKey;

const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');
const User = require('../../models/User');


router.post('/register', (req, res) => {
    const {err, isValid} = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(err);
    }

    User.findOne({email: req.body.email})
        .then( user => {
            if (user) {
                err.email = 'There is an account associated with that Email!'
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password1,
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then( user => {
                                const payload = { id: user.id, userName: user.name };

                                jwt.sign(payload,
                                    k,
                                    { expiresIn: 3600},
                                    (err, token) =>{
                                    res.json({
                                        success: true,
                                        token: 'Bearer ' + token,
                                    });
                                });

                            })
                            .catch( err => console.log(err));
                    } )
                })
            }
        }) 
})

router.post('/login', (req, res) => {
    const { err, isValid } = validateLoginInput(req.body);
    if(!isValid) {
        return res.status(400).json(err);
    }

    const {email, password} = req.body;
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

                        const payload = { id: user.id, userName: user.name };

                        jwt.sign(
                            payload,
                            k,
                            {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token,
                                });
                            });
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

