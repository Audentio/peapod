import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Conditions

    // Variables
    sheet.setValues({
        color: {
            base: '$color.primary.base',
            hover: '$color.primary.hover',
            active: '$color.primary.active',
        },
    });


    main.addSelector({
        common: {
            color: '$anchor.color.base',
            textDecoration: 'none',

            ':hover': {
                color: '$anchor.color.hover',
            },

            ':active': {
                color: '$anchor.color.active',
            },
        },
    });

    return sheet;
};
