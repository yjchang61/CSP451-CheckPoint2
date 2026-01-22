/**
 * Simple Database Logger
 * Handles error reporting and query logging for the DB module.
 */

const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '..', '..', 'db.log');

class DBLogger {
    static logQuery(query, params) {
        const timestamp = new Date().toISOString();
        const entry = `[${timestamp}] QUERY: ${query} PARAMS: ${JSON.stringify(params)}\n`;
        this._write(entry);
    }

    static logError(error) {
        const timestamp = new Date().toISOString();
        const entry = `[${timestamp}] ERROR: ${error.message}\nSTACK: ${error.stack}\n`;
        this._write(entry);
    }

    static logConnection(status) {
        const timestamp = new Date().toISOString();
        const entry = `[${timestamp}] CONNECTION: ${status}\n`;
        this._write(entry);
    }
    
    /**
     * Internal write method.
     * In a real app, this might write to a rotating log file or external service (DataDog/Splunk).
     */
    static _write(message) {
        // We will append to a local file for demonstration
        fs.appendFile(LOG_FILE, message, (err) => {
            if (err) console.error("Failed to write to DB log:", err);
        });
        
        // Also echo to console in dev mode
        if (process.env.NODE_ENV !== 'production') {
            console.log("DB_LOG:", message.trim());
        }
    }
}

module.exports = DBLogger;
