module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('dark').addStyler({ dark: true });
    sheet.addCondition('header').addStyler({ header: true });
    sheet.addCondition('notHeader').addStyler({ header: ['!=', true] });
    sheet.addCondition('checked').addStyler({ checked: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            display: 'table-row',
            color: theme.table.color.lightRow.color,
            background: theme.table.color.lightRow.background,
        }).selector('.main.--dark', {
            color: theme.table.color.darkRow.color,
            background: theme.table.color.darkRow.background,
        }).selector('.main.--notHeader:hover', {
            background: theme.table.color.lightRow.hover,
        }).selector('.main.--dark.--notHeader:hover', {
            background: theme.table.color.darkRow.hover,
        }).selector('.main.--checked', {
            color: theme.table.color.checked.color,
            background: theme.table.color.checked.background,
            ':hover': {
                background: theme.table.color.checked.hover,
            },
        }).selector('.main.--header', {
            color: theme.table.color.header.color,
            background: theme.table.color.header.background,
            ':hover': {
                background: theme.table.color.header.hover,
            },
        });
    };

    return sheet;
};
