import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    var sheet = new Sheet(sheetName),
        main = sheet.addMain();

    // Conditions
    sheet.addCondition('vertical').addProp({ vertical: true });

    // Variables
    sheet.setValues({});

    main.addSelector({
        condition: ['vertical'],
        common: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
        },
    });

    return sheet;
};
