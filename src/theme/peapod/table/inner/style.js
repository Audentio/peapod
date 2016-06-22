import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const row = sheet.addPart('row');

    // Conditions
    sheet.addCondition('dark').addStyler({ dark: true });
    sheet.addCondition('hovered').addStyler({ hovered: true });
    sheet.addCondition('header').addStyler({ header: true });
    sheet.addCondition('checked').addStyler({ checked: true });

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            display: 'table',
            width: '100%',
            fontSize: '$table.font.size',
        },
    });

    row.addSelector({
        common: {
            display: 'table-row',
            color: '$table.color.lightRow.color',
            background: '$table.color.lightRow.background',
            height: '48px',
            lineHeight: '48px',
        },
    }).addSelector({
        condition: ['dark'],
        common: {
            color: '$table.color.darkRow.color',
            background: '$table.color.darkRow.background',
        },
    }).addSelector({
        condition: ['hovered'],
        common: {
            color: '$table.color.darkRow.color',
            background: '$table.color.darkRow.hover',
        },
    }).addSelector({
        condition: ['header'],
        common: {
            color: '$table.color.header.color',
            background: '$table.color.header.background',
            fontFamily: '$table.font.headerFamily',
            fontSize: '$table.font.headerSize',
            fontWeight: '$table.font.headerWeight',
            height: '56px',
            lineHeight: '56px',
        },
    }).addSelector({
        condition: ['checked'],
        common: {
            color: '$table.color.checked.color',
            background: '$table.color.checked.background',
        },
    });

    return sheet;
};
