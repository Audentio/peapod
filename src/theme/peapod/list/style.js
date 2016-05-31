import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            maxHeight: 200,
            overflowX: 'hidden',
            overflowY: 'auto',
            borderTopWidth: '1px',
            borderBottomWidth: '1px',
            borderStyle: 'solid',
            borderColor: '$palette.grey200',
        },
    });

    return sheet;
};
