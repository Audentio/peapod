import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
    var sheet = new Sheet(sheetName),
    main = sheet.addMain();

    // Conditions
    sheet.addCondition('height').addProp({ height: ['!=', undefined] });
    sheet.addCondition('width').addProp({ width: ['!=', undefined] });

    // Variables
    sheet.setValues({});


    main.addSelector({
        common: {
            display: 'block',
            width: '100%',
            height: '400px',
        },
    }).addSelector({
        condition: ['height'],
        common: {
            height: 'getProp:height',
        },
    }).addSelector({
        condition: ['width'],
        common: {
            width: 'getProp:width',
        },
    });

    return sheet;
};
