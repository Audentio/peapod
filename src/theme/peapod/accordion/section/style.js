import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const title = sheet.addPart('title');
    const content = sheet.addPart('content');
    const contentWrap = sheet.addPart('contentWrap');

    // Conditions
    sheet.addCondition('isLast').addProp({ isLast: true });
    sheet.addCondition('isActive').addProp({ active: true });
    sheet.addCondition('notActive').addProp({ active: false });

    sheet.addCondition('horizontal').addProp({ horizontal: true });
    sheet.addCondition('notHorizontal').addProp({ horizontal: undefined });
    sheet.addCondition('open').addState({ open: true });

    // Variables
    sheet.setValues({});

    main.addSelector({
        condition: ['horizontal'],
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
        condition: ['horizontal'],
        common: {
            borderBottomWidth: 1,
            borderRightWidth: 0,
        },
    }).addSelector({
        condition: ['horizontal', 'isLast', 'notActive'],
        common: {
            borderRightWidth: 1,
        },
    });

    contentWrap.addSelector({
        common: {
            borderStyle: 'solid',
            borderColor: '#ddd',
            borderWidth: '0 1px 0',
        },
    }).addSelector({
        condition: ['isLast'],
        common: {
            borderBottomWidth: '1px',
        },
    }).addSelector({
        condition: ['isActive'],
        common: {
            borderTopWidth: '1px',
        },
    }).addSelector({
        condition: ['horizontal'],
        common: {
            borderBottomWidth: 1,
            borderRightWidth: 0,
        },
    }).addSelector({
        condition: ['horizontal', 'isLast', 'isActive'],
        common: {
            borderRightWidth: 1,
        },
    }).addSelector({
        condition: ['notHorizontal'],
        common: {
            maxHeight: 0,
            overflow: 'hidden',
            transition: 'max-height 5s',
        },
    }).addSelector({
        condition: ['open', 'notHorizontal'],
        common: {
            maxHeight: '500px',
            transition: 'max-height 5s',
        },
    }).addSelector({
        condition: ['horizontal'],
        common: {
            maxWidth: 0,
            overflow: 'hidden',
            transition: 'max-width 5s',
        },
    }).addSelector({
        condition: ['open', 'horizontal'],
        common: {
            maxWidth: '500px',
            transition: 'max-width 5s',
        },
    });

    content.addSelector({
        common: {
            padding: '$gutter.small',
        },
    });

    return sheet;
};
