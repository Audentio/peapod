import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    var sheet = new Sheet(sheetName),
        main = sheet.addMain();

    // Conditions

    // Variables

    main.addSelector({
        common: {
            backgroundColor: 'rgba(0,0,0,.4)',
            position: 'fixed',
            zIndex: '$zIndex.level10',
            top: 0, right: 0,
            bottom: 0, left:0,
        },
    });

    return sheet;
};
