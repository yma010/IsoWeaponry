const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = process.env.MONGO_URI || require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const rentals = require('./routes/api/rentals');
const admins = require('./routes/api/admins');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwtStrat = require('./config/passport');

app.use(passport.initialize());
jwtStrat(passport);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB Successfully'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send("Hello World"));

app.use('/api/users', users);
app.use('/api/rentals', rentals);
app.use('/api/admin', admins);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));

module.exports = app;