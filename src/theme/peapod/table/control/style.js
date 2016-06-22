import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            color: '$table.color.controls.color',
            background: '$table.color.controls.background',
            // height: '64px',
            // lineHeight: '64px',
        },
    });

    return sheet;
};
