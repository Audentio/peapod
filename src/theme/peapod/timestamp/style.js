import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            cursor: 'default',
        },
    });

    return sheet;
};
