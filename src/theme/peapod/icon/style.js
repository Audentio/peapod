import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Variables
    sheet.setValues({
        font: {
            size: 'inherit',
        },
        color: 'inherit',
    });

    sheet.addCondition('sizeSet').addStyler({ size: ['!=', undefined] });
    sheet.addCondition('colorSet').addStyler({ color: ['!=', undefined] });

    main.addSelector({
        common: {
            // cursor: 'default',
            fontSize: '$icon.font.size',
        },
    }).addSelector({
        condition: ['sizeSet'],
        common: {
            fontSize: 'getStyler:size',
        },
    }).addSelector({
        condition: ['colorSet'],
        common: {
            color: 'getStyler:color',
        },
    });

    return sheet;
};
