import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Conditions
    sheet.addCondition('active').addProp({ active: true });
    sheet.addCondition('inactive').addProp({ active: false });

    main.addSelector({
        condition: ['inactive'],
        common: {
            display: 'none',
        },
    });

    return sheet;
};
