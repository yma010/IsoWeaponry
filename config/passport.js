const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const k = process.env.secretOrKey || require('./keys').secretOrKey;

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = k;

module.exports = passport => {
    passport.use( new JwtStrategy(options, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then( user => {
                if (user) {
                    //returns user to frontend
                    return done(null, user);
                } 
                //no user found
                return done(null, false);
            })
            .catch( err => console.log(err));
    }));
};

