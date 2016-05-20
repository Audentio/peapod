/* eslint-disable no-console */
/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/
/*
const Logger = {
    log: (...args) => console.log(...args),
    info:
        (console.info !== undefined) ?
        (...args) => console.info(...args)
        :
        (message) => console.log(`INFO: ${message}`),

    warn:
        (console.warn !== undefined) ?
        (...args) => console.warn(...args)
        :
        (message) => console.log(`WARNING: ${message}`),
    error:
        (console.error !== undefined) ?
        (...args) => console.error(...args)
        :
        (message) => console.log(`ERROR: ${message}`),
    group:
        (console.group !== undefined) ?
        (...args) => console.group(...args)
        :
        () => false,
    groupCollapsed:
        (console.groupCollapsed !== undefined) ?
        (...args) => console.groupCollapsed(...args)
        :
        () => false,
    groupEnd:
        (console.groupEnd !== undefined) ?
        (...args) => console.groupEnd(...args)
        :
        () => false,
};*/

const showLogs = true;
const Logger = console;

if (showLogs) {
    module.exports = Logger;
} else {
    module.exports = {};
}
