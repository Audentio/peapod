module.exports = function (sheet) {
    const main = sheet.addMain();

    // Conditions
    sheet.addCondition('secondary').addStyler({ secondary: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                marginBottom: theme.font.margins.xsmall,
                marginTop: 0,
                fontSize: theme.font.size.xsmall,
                color: theme.font.color.primary,
                lineHeight: '2.6rem',
                fontWeight: theme.font.weight.normal,
                display: 'inline-block',
            },
        }).addSelector({
            condition: ['secondary'],
            common: {
                marginBottom: '0px',
            },
        });
    };

    return sheet;
};
