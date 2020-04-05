const express = require('express');
const app = express();


app.use('/usuario', require('../routes/usuario'));
app.use('/login', require('../routes/login'));


module.exports = app;