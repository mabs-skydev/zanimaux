const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const moment = require('moment');

//Routes
const users = require('./routes/users');
const consultations = require('./routes/consultations');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/consultations', consultations);


mongoose.connect('mongodb+srv://root:root@cluster0.tjuwc.mongodb.net/zanimaux?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {console.log('Connected to database...')})
.catch(err => console.log(err))

app.listen(5000, () => {
    console.log("Your app is now listening on http://localhost:5000");
});