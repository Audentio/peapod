module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('dark').addStyler({ dark: true });
    sheet.addCondition('hovered').addStyler({ hovered: true });
    sheet.addCondition('header').addStyler({ header: true });
    sheet.addCondition('checked').addStyler({ checked: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            display: 'table',
            width: '100%',
            fontSize: theme.table.font.size,
        });

        sheet.selector('.row', {
            display: 'table-row',
            color: theme.table.color.lightRow.color,
            background: theme.table.color.lightRow.background,
            height: '48px',
            lineHeight: '48px',
        }).selector('.row.--dark', {
            color: theme.table.color.darkRow.color,
            background: theme.table.color.darkRow.background,
        }).selector('.row:hover, .row.--dark:hover', {
            color: theme.table.color.darkRow.color,
            background: theme.table.color.darkRow.hover,
        }).selector('.row.--header', {
            color: theme.table.color.header.color,
            background: theme.table.color.header.background,
            fontFamily: theme.table.font.headerFamily,
            fontSize: theme.table.font.headerSize,
            fontWeight: theme.table.font.headerWeight,
            height: '56px',
            lineHeight: '56px',
        }).selector('.row.--checked', {
            color: theme.table.color.checked.color,
            background: theme.table.color.checked.background,
        });
    };

    return sheet;
};
