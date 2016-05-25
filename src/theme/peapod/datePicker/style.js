import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const card = sheet.addPart('card');
    const calendar = sheet.addPart('calendar');

    // Conditions
    // Variables
    sheet.setValues({
    });

    main.addSelector({
        common: {
            display: 'inline-block',
        },
    });
    card.addSelector({
        common: {
            marginTop: '$gutter.internal',
            marginRight: 0,
            marginBottom: 0,
            marginLeft: 0,
        },
    });
    calendar.addSelector({
        common: {},
    });

    return sheet;
};
