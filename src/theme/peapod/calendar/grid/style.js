import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
    var sheet = new Sheet(sheetName);
    var main = sheet.addMain();

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            listStyle: 'none',
            width: '350px',
            background: '#fff',
            overflow: 'hidden',
            padding: 0,
            margin: 0,
        },
    });

    return sheet;
};
