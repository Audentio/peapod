module.exports = function (sheet) {
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
        sheet.selector('.main', {
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
        }).selector('.main.--centered', {
            textAlign: 'center',
        }).selector('.main.--sortable:hover', {
            color: theme.table.color.columnHovered.color,
            background: theme.table.color.columnHovered.background,
        }).selector('.main.--header', {
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopWidth: '1px',
        }).selector('.main.--header.--sortable:hover', {
            color: theme.table.color.columnHovered.headerColor,
            background: theme.table.color.columnHovered.headerBackground,
            cursor: 'pointer',
        }).selector('.main.--noData', {
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 0,
            borderTopWidth: 0,
        });
    };

    return sheet;
};
