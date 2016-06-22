import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const triggers = sheet.addPart('triggers');
    const panels = sheet.addPart('panels');

    // Variables
    sheet.setValues({});

    // Selectors
    main.addSelector({
        common: {
            // borderLeft: '10px solid {$color.primary.base}',
        },
    });

    triggers.addSelector({
        common: {
            backgroundColor: '$color.base.table',
        },
    });

    panels.addSelector({
        common: {
            padding: '{$gutter.internal}',
        },
    });

    return sheet;
};
