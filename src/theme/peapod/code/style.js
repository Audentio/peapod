import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    var sheet = new Sheet(sheetName),
    main = sheet.addMain();

    // Conditions

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            backgroundColor: '$palette.blue50',
            color: '$palette.blue700',
            padding: '1px 2px',
            fontSize: '85%',
            fontFamily: '$font.family.code',
        },
    });

    return sheet;
};
