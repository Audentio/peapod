import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Conditions

    // Variables
    sheet.setValues({});


    main.addSelector({
        common: {
            background: '$palette.grey100',
            padding: '$gutter.small',
            borderLeftWidth: '5px',
            borderLeftStyle: 'solid',
            borderLeftColor: '$color.primary.base',
            marginLeft: '$gutter.large',
        },
    });

    return sheet;
};
