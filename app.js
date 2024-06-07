'use strict';
const { db } = require('./src/models');
const app = require("./src/index");


require('dotenv').config();
const PORT = process.env.PORT || 3000;

function start() {
    if (!PORT) {
        throw new Error('Missing Port');
    }
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

db.sequelize.sync()
    .then(() => {
        start(PORT);
    })
    .catch(error => {
        console.error('Error synchronizing database:', error);
    });