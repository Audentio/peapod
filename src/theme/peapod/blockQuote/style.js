module.exports = function (sheet) {
    const main = sheet.addMain();

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                background: theme.palette.grey100,
                padding: theme.gutter.small,
                borderLeftWidth: '5px',
                borderLeftStyle: 'solid',
                borderLeftColor: theme.color.primary.base,
                marginLeft: theme.gutter.large,
            },
        });
    };

    return sheet;
};
