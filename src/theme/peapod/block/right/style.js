import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Conditions

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
        },
    });

    return sheet;
};
