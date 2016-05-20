import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const title = sheet.addPart('title');
    const content = sheet.addPart('content');

    // Conditions
    sheet.addCondition('isLast').addProp({ isLast: true });
    sheet.addCondition('isActive').addProp({ active: true });
    sheet.addCondition('notActive').addProp({ active: false });

    sheet.addCondition('vertical').addProp({ vertical: true });

    // Variables
    sheet.setValues({});

    main.addSelector({
        condition: ['vertical'],
        common: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
        },
    });

    title.addSelector({
        common: {
            borderStyle: 'solid',
            borderColor: '#ddd',
            borderWidth: '1px 1px 0',
            padding: '$gutter.small',
        },
    }).addSelector({
        condition: ['isLast', 'notActive'],
        common: {
            borderBottomWidth: 1,
        },
    }).addSelector({
        condition: ['vertical'],
        common: {
            borderBottomWidth: 1,
            borderRightWidth: 0,
        },
    }).addSelector({
        condition: ['vertical', 'isLast', 'notActive'],
        common: {
            borderRightWidth: 1,
        },
    });

    content.addSelector({
        common: {
            borderStyle: 'solid',
            borderColor: '#ddd',
            borderWidth: '1px 1px 0',
            padding: '$gutter.small',
        },
    }).addSelector({
        condition: ['isLast', 'isActive'],
        common: {
            borderBottomWidth: '1px',
        },
    }).addSelector({
        condition: ['vertical'],
        common: {
            borderBottomWidth: 1,
            borderRightWidth: 0,
        },
    }).addSelector({
        condition: ['vertical', 'isLast', 'isActive'],
        common: {
            borderRightWidth: 1,
        },
    });

    return sheet;
};
