import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
    var sheet = new Sheet(sheetName),
    main = sheet.addMain(),
    calendar = sheet.addPart('calendar');

    // Conditions
    // Variables
    sheet.setValues({
    });

    main.addSelector({
        common: {
            display: 'inline-block',
        },
    });
    calendar.addSelector({
        common: {},
    });
};
