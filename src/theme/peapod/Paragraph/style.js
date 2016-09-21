module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('secondary').addStyler({ secondary: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            marginBottom: theme.font.margins.xsmall,
            marginTop: 0,
            fontSize: theme.font.size.xsmall,
            color: theme.font.color.primary,
            lineHeight: '2.6rem',
            fontWeight: theme.font.weight.normal,
            display: 'inline-block',
        }).selector('.main.--secondary', {
            marginBottom: '0px',
        });
    };

    return sheet;
};
