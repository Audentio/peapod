import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const scrolled = sheet.addPart('scrolled');

    // Variables
    main.addSelector({
        common: {
            position: 'static',
            zIndex: '$zIndex.level5',
            willChange: 'position',
            transition: 'all .3s',
        },
    });

    scrolled.addSelector({
        common: {
            // transition: 'all .3s',
        },
    });

    return sheet;
};
