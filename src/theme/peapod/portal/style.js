import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
    var sheet = new Sheet(sheetName),
    main = sheet.addMain();

    // Variables
    sheet.setValues({
        font: {
            family: '$font.family.primary',
        },
        dropdown: {
            width: '20rem',
        },
    });

    main.addSelector({
        common: {
            fontFamily: '$portal.font.family',
            width: '$portal.dropdown.width',
        },
    });

    return sheet;
};
