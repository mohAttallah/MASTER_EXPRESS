'use strict';
const express = require('express');
const cors = require('cors');
const logger = require('./utils/logger');
const readLogs = require('./utils/readLogs');
const erroHandler404 = require('./middlewares/404');
const erroHandler500 = require('./middlewares/500');

const app = express();
app.use(cors());
app.use(express.json());

process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception: ${err.message}`);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

// Routes
app.get('/', (req, res) => {
    logger.info('Hello world route accessed');
    res.send('Hello World!');
});

// Read Log error
app.get('/logs/:type', (req, res) => {
    const logType = req.params.type;
    const logData = readLogs(logType);
    res.setHeader('Content-Type', 'text/plain');
    res.send(logData);
});

// 404 Error Handler
app.use(erroHandler404);

// 500 Error Handler
app.use(erroHandler500);

module.exports = app;
