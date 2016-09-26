module.exports = function (sheet) {
    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: theme.palette.grey200,
            padding: theme.sitespcaing.medium,
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            borderBottomWidth: component.borderWidth,
            borderBottomStyle: component.borderStyle,
            borderBottomColor: component.borderColor,
            paddingTop(obj) {
                return obj.props.padding || component.padding;
            },
            paddingBottom(obj) {
                return obj.props.padding || component.padding;
            },
            fontFamily: theme.font.family.primary,
        });
    };

    return sheet;
};
