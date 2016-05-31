import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    main.addSelector({
        common: {
            height: '1px',
            borderWidth: 0,
            backgroundColor: '$palette.grey300',
            margin: '{$gutter.internal} auto', // in case someone puts a width it will center
        },
    });

    return sheet;
};
