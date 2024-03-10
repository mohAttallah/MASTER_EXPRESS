'use strict';
const express = require('express');
const cors = require("cors");
require('dotenv').config();
const PORT = process.env.PORT || 3000
const { db } = require('./models');
const app = express();
app.use(cors());
app.use(express.json());



// for test 
app.get('/', (req, res, next) => {
    try {

        res.status(200).json({ message: "Home" })

    } catch (error) {
        next(error)
    }
})

function start(PORT) {
    if (!PORT) { throw new Error('Missing Port'); }
    app.listen(PORT, () => {
        console.log(`listining on port ${PORT}`)
    })
}

db.sequelize.sync()
    .then(() => {
        start(PORT);
    })
    .catch(error => {
        console.error('Error synchronizing database:', error);
    });
