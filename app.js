const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const port = process.env.PORT || 3000;
const routes = require('./routes')

app.use(express.json());
app.use(cookieParser());

//get all routes on routes/index.js
app.use(routes);

app.listen(port, () => {
    console.log('run di http://localhost:'+ port);
})


