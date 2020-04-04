const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');

//Settings
const app = express();

//Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Routes
app.get('/usuarios', (req, res) => {
    res.json('Usuarios');
})

//Initialize the server
app.listen(process.env.PORT, () => {
    console.log(`server on port ${process.env.PORT}`);
})