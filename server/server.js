const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const mongoose = require('mongoose');

//Connection to DB
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(res => console.log('[DB: Connected]'))
.catch(err => console.log('[DB: Error]'));

//Settings
const app = express();

//Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Routes
app.get('/', (req, res) => {
    res.json('Index');
})

app.use('/usuario', require('./routes/usuario'));

//Initialize the server
app.listen(process.env.PORT, () => {
    console.log(`server on port ${process.env.PORT}`);
})