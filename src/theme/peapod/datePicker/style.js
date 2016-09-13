module.exports = function (sheet) {
    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            display: 'inline-block',
        });

        sheet.selector('.card', {
            marginTop: theme.gutter.internal,
            marginRight: 0,
            marginBottom: 0,
            marginLeft: 0,
        });

        sheet.selector('.calendar', {

        });
    };

    return sheet;
};
