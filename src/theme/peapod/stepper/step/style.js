import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const content = sheet.addPart('content');

    // Conditions
    sheet.addCondition('horizontal').addProp({ orientation: 'horizontal' });

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            padding: '$gutter.small',
            width: '100%',
            // background: '#fafafa',
        },
    });

    content.addSelector({
        common: {
            marginBottom: '$gutter.large',
            width: '100%',
            // background: '#fafafa',
        },
    });

    return sheet;
};
