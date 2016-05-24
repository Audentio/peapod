import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            listStyle: 'none',
            width: '350px',
            background: '#fff',
            overflow: 'hidden',
            padding: 0,
            margin: '$gutter.extrasmall',
        },
    });

    return sheet;
};
