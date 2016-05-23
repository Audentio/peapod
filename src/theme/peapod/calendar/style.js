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
            width: '366px',
            background: '#fff',
            fontSize: '12px',
        },
    });

    dateBar.addSelector({
        common: {
            background: '$palette.teal500',
            color: '$palette.grey400',
            padding: '$gutter.small',
            fontWeight: 'bold',
        },
    });

    date.addSelector({
        common: {
            fontSize: '$font.size.display1',
            color: 'white',
        },
    });

    return sheet;
};
