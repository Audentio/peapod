module.exports = function (sheet) {
    const main = sheet.addMain();

    // Conditions
    sheet.addCondition('firstCell').addStyler({ firstCell: true });
    sheet.addCondition('centered').addStyler({ centered: true });
    sheet.addCondition('hovered').addStyler({ hovered: true });
    sheet.addCondition('header').addStyler({ header: true });
    sheet.addCondition('sortable').addStyler({ sortable: true });
    sheet.addCondition('noData').addStyler({ noData: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                display: 'table-cell',
                // paddingTop: '$table.gutter.vertical',
                // paddingBottom: '$table.gutter.vertical',
                paddingLeft: theme.table.gutter.horizontal,
                paddingRight: theme.table.gutter.horizontal,
                fontSize: 'inherit',
                fontFamily: theme.table.font.family,
                borderStyle: theme.table.border.style,
                borderColor: theme.table.border.color,
                borderBottomWidth: theme.table.border.width,
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
                color: theme.table.color.columnHovered.color,
                background: theme.table.color.columnHovered.background,
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
                color: theme.table.color.columnHovered.headerColor,
                background: theme.table.color.columnHovered.headerBackground,
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
    };

    return sheet;
};
