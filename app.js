const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = process.env.MONGO_URI || require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const weapons = require('./routes/api/weapons');

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB Successfully'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send("Hello World"));

app.use('/api/users', users);
app.use('/api/weapons', weapons);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));