const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = process.env.MONGO_URI || require('./config/keys').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB Successfully'))
    .catch(err => console.log(err));




app.get('/', (req, res) => res.send("Hello World"));




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));