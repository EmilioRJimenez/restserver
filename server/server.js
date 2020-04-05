const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Settings
const app = express();
require('./config/config');

//Connection to DB
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(res => console.log('[DB: Connected]'))
.catch(err => console.log('[DB: Error]'));

//Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Routes
app.get('/', (req, res) => {
    res.json('Index');
})

app.use('/', require('./routes/index'));

//Initialize the server
app.listen(process.env.PORT, () => {
    console.log(`server on port ${process.env.PORT}`);
})