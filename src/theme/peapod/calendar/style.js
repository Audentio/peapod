import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const dateBar = sheet.addPart('dateBar');
    // const year = sheet.addPart('year');
    const date = sheet.addPart('date');

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
