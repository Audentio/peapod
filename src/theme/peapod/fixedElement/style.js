import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Variables
    main.addSelector({
        common: {
            position: 'static',
            zIndex: '$zIndex.level5',
            willChange: 'position',
        },
    });

    return sheet;
};
