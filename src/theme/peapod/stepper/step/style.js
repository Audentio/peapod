import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const content = sheet.addPart('content');

    // Conditions
    sheet.addCondition('horizontal').addProp({ orientation: 'horizontal' });
    sheet.addCondition('hidden').addProp({ hidden: true });

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            padding: '$gutter.small',
            width: '100%',
            // background: '#fafafa',
        },
    }).addSelector({
        condition: ['hidden'],
        common: {
            display: 'none',
            // background: '#fafafa',
        },
    });

    content.addSelector({
        common: {
            width: '100%',
            // background: '#fafafa',
        },
    });

    return sheet;
};
