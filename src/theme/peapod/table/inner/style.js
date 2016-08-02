module.exports = function (sheet) {
    const main = sheet.addMain();
    const row = sheet.addPart('row');

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
        main.addSelector({
            common: {
                display: 'table',
                width: '100%',
                fontSize: theme.table.font.size,
            },
        });

        row.addSelector({
            common: {
                display: 'table-row',
                color: theme.table.color.lightRow.color,
                background: theme.table.color.lightRow.background,
                height: '48px',
                lineHeight: '48px',
            },
        }).addSelector({
            condition: ['dark'],
            common: {
                color: theme.table.color.darkRow.color,
                background: theme.table.color.darkRow.background,
            },
        }).addSelector({
            condition: ['hovered'],
            common: {
                color: theme.table.color.darkRow.color,
                background: theme.table.color.darkRow.hover,
            },
        }).addSelector({
            condition: ['header'],
            common: {
                color: theme.table.color.header.color,
                background: theme.table.color.header.background,
                fontFamily: theme.table.font.headerFamily,
                fontSize: theme.table.font.headerSize,
                fontWeight: theme.table.font.headerWeight,
                height: '56px',
                lineHeight: '56px',
            },
        }).addSelector({
            condition: ['checked'],
            common: {
                color: theme.table.color.checked.color,
                background: theme.table.color.checked.background,
            },
        });
    };

    return sheet;
};
