import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
    var sheet = new Sheet(sheetName),
    main = sheet.addMain();

    // Conditions
    // Variables
    main.addSelector({
        common: {
            position: 'static',
            zIndex: '998',
            // transform: 'translate3d(0, 0, 0)'
            willChange: 'position',
        },
    });

    return sheet;
};
