import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
    var sheet = new Sheet(sheetName);
    var main = sheet.addMain();
    var dateBar = sheet.addPart('dateBar');
    var year = sheet.addPart('year');
    var date = sheet.addPart('date');

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            width: '350px',
        },
    });

    dateBar.addSelector({
        common: {
            background: '$palette.blue400',
            color: '#fff',
            padding: '$gutter.small',
        },
    });

    date.addSelector({
        common: {
            fontSize: '$font.size.display1',
        },
    });

    return sheet;
};
