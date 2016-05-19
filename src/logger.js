/* eslint-disable no-console */
/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

const showLogs = false;

const Logger = {
    log: console.log,
    info: (console.error !== undefined) ? console.info : (message) => Logger.log(`INFO: ${message}`),
    warn: (console.warn !== undefined) ? console.warn : (message) => Logger.log(`WARNING: ${message}`),
    error: (console.error !== undefined) ? console.error : (message) => Logger.log(`ERROR: ${message}`),
};

if (showLogs === false) {
    Logger.log = () => false;
    Logger.info = () => false;
    Logger.warn = () => false;
    Logger.error = () => false;
}

export default Logger;
