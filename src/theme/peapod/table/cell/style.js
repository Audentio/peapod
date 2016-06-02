import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Conditions
    sheet.addCondition('firstCell').addStyler({ firstCell: true });
    sheet.addCondition('centered').addStyler({ centered: true });
    sheet.addCondition('hovered').addStyler({ hovered: true });
    sheet.addCondition('header').addStyler({ header: true });
    sheet.addCondition('sortable').addStyler({ sortable: true });
    sheet.addCondition('noData').addStyler({ noData: true });

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            display: 'table-cell',
            // paddingTop: '$table.gutter.vertical',
            // paddingBottom: '$table.gutter.vertical',
            paddingLeft: '$table.gutter.horizontal',
            paddingRight: '$table.gutter.horizontal',
            fontSize: 'inherit',
            fontFamily: '$table.font.family',
            borderStyle: '$table.border.style',
            borderColor: '$table.border.color',
            borderBottomWidth: '$table.border.width',
            borderLeftWidth: 0,
            borderTopWidth: 0,
            borderRightWidth: 0,
        },
    })
    .addSelector({
        condition: ['centered'],
        common: {
            textAlign: 'center',
        },
    })
    .addSelector({
        condition: ['hovered', 'sortable'],
        common: {
            color: '$table.color.columnHovered.color',
            background: '$table.color.columnHovered.background',
        },
    })
    .addSelector({
        condition: ['header'],
        common: {
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopWidth: '1px',
        },
    })
    .addSelector({
        condition: ['header', 'hovered', 'sortable'],
        common: {
            color: '$table.color.columnHovered.headerColor',
            background: '$table.color.columnHovered.headerBackground',
            cursor: 'pointer',
        },
    })
    .addSelector({
        condition: ['noData'],
        common: {
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 0,
            borderTopWidth: 0,
        },
    });

    return sheet;
};
