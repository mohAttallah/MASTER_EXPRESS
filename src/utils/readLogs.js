const fs = require('fs');
const path = require('path');



const readLogs = (logType = 'combined') => {
    const logFilePath = path.join(__dirname, `../../logs/${logType}.log`);
    try {
        const logData = fs.readFileSync(logFilePath, 'utf8');
        return logData;
    } catch (err) {
        console.error(`Error reading ${logType} log file:`, err);
        return `Error reading ${logType} log file.`;
    }
};

module.exports = readLogs;
