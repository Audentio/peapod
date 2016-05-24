import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Conditions

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            width: '100%',
            height: '300px',
            background: '#efefef',
            padding: '30px',
            fontSize: '3em',
        },
    });

    return sheet;
};
