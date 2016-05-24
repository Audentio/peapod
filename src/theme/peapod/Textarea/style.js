import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {

    var sheet = new Sheet(sheetName),
    main = sheet.addMain();

    main.addSelector({
        common: {},
    });

    return sheet;
};
