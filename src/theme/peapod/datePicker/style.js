import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const calendar = sheet.addPart('calendar');

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

    return sheet;
};
