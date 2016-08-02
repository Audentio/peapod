module.exports = function (sheet) {
    const main = sheet.addMain();

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
        main.addSelector({
            common: {
                borderBottomWidth: theme.section.borderWidth,
                borderBottomStyle: theme.section.borderStyle,
                borderBottomColor: theme.section.borderColor,
                paddingTop(obj) {
                    return obj.props.padding || theme.section.padding;
                },
                paddingBottom(obj) {
                    return obj.props.padding || theme.section.padding;
                },
                fontFamily: theme.font.family.primary,
            },
        });
    };

    return sheet;
};
