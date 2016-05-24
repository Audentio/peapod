import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const listitem = sheet.addPart('listitem');

    // Conditions

    // Variables
    sheet.setValues({});


    main.addSelector({
        common: {},
    });

    listitem.addSelector({
        common: {
            display: 'inline-block',
            padding: '8px',
        },
    });

    return sheet;
};
