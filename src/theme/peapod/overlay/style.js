import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    main.addSelector({
        common: {
            backgroundColor: 'rgba(0,0,0,.4)',
            position: 'fixed',
            zIndex: '$zIndex.level10',
            top: 0, right: 0,
            bottom: 0, left: 0,
        },
    });

    return sheet;
};
