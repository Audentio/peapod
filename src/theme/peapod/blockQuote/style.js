module.exports = function (sheet) {
    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            background: theme.palette.grey100,
            padding: theme.gutter.small,
            borderLeftWidth: '5px',
            borderLeftStyle: 'solid',
            borderLeftColor: theme.color.primary.base,
            marginLeft: theme.gutter.large,
        });
    };

    return sheet;
};
