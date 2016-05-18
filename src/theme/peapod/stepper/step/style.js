import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Conditions
    sheet.addCondition('horizontal').addProp({ orientation: 'horizontal' });

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            padding: '$gutter.large',
            width: '100%',
            background: '#fafafa',
        },
    });

    return sheet;
};
