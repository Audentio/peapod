module.exports = function (sheet) {
    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            marginBottom(obj) {
                return obj.props.margin || theme.sitespcaing.medium;
            },
        });
    };

    return sheet;
};
