import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain(); // eslint-disable-line no-unused-vars

    // Conditions

    // Variables
    sheet.setValues({});

    return sheet;
};
