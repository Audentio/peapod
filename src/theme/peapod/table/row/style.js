module.exports = function (sheet) {
    const main = sheet.addMain();

    // Conditions
    sheet.addCondition('dark').addStyler({ dark: true });
    sheet.addCondition('header').addStyler({ header: true });
    sheet.addCondition('checked').addStyler({ checked: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                display: 'table-row',
                color: theme.table.color.lightRow.color,
                background: theme.table.color.lightRow.background,
            },
        }).addSelector({
            condition: ['dark'],
            common: {
                color: theme.table.color.darkRow.color,
                background: theme.table.color.darkRow.background,
            },
        }).addSelector({
            condition: ['!header'],
            common: {
                ':hover': {
                    background: theme.table.color.lightRow.hover,
                },
            },
        }).addSelector({
            condition: ['dark', '!header'],
            common: {
                ':hover': {
                    background: theme.table.color.darkRow.hover,
                },
            },
        }).addSelector({
            condition: ['checked'],
            common: {
                color: theme.table.color.checked.color,
                background: theme.table.color.checked.background,
                ':hover': {
                    background: theme.table.color.checked.hover,
                },
            },
        }).addSelector({
            condition: ['header'],
            common: {
                color: theme.table.color.header.color,
                background: theme.table.color.header.background,
                ':hover': {
                    background: theme.table.color.header.hover,
                },
            },
        });
    };

    return sheet;
};
