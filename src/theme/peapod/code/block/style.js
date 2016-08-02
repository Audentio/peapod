module.exports = function (sheet) {
    const main = sheet.addMain();
    const label = sheet.addPart('label');
    const code = sheet.addPart('code');

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                display: 'block',
                marginBottom: theme.gutter.internal,
                fontFamily: theme.font.family.code,
                fontSize: theme.font.size.small,
                border: 0,
            },
        });

        code.addSelector({
            common: {
                padding: theme.gutter.internal,
            },
        });

        label.addSelector({
            common: {
                display: 'inline-block',
                borderBottom: `2px solid ${theme.color.general.base}`,
                padding: '0 10px 5px 1px',
                textTransform: 'uppercase',
                fontFamily: theme.font.family.primary,
                fontSize: '.9em',
                fontWeight: theme.font.weight.bold,
            },
        });
    };

    return sheet;
};
