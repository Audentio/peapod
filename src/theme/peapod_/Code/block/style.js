module.exports = function (sheet) {
    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            display: 'block',
            marginBottom: theme.gutter.internal,
            fontFamily: theme.font.family.code,
            fontSize: theme.font.size.small,
            border: 0,
        });

        sheet.selector('.code', {
            padding: theme.gutter.internal,
        });

        sheet.selector('.label', {
            display: 'inline-block',
            borderBottom: `2px solid ${theme.color.general.base}`,
            padding: '0 10px 5px 1px',
            textTransform: 'uppercase',
            fontFamily: theme.font.family.primary,
            fontSize: '.9em',
            fontWeight: theme.font.weight.bold,
        });
    };

    return sheet;
};
