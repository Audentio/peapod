import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const trigger = sheet.addPart('trigger');

    main.addSelector({
        common: {
        },
    });

    trigger.addSelector({
        common: {
            cursor: 'pointer',
        },
    });

    return sheet;
};
