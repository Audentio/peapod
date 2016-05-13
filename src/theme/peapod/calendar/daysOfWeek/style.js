import {Sheet} from 'stylesheet.js';

module.exports = function(sheetName) {
    var sheet = new Sheet(sheetName);
    var main = sheet.addMain();

    //Variables
    sheet.setValues({});

    main.addSelector({
        common: {}
    });

    return sheet;
}
