module.exports = function (sheet) {
    const main = sheet.addMain();

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            maxWidth: theme.site.maxWidth,
            width: theme.site.width,
            padding: theme.gutter.internal,
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                maxWidth: component.maxWidth,
                width: component.width,
                margin: '0 auto',
                paddingLeft: component.padding,
                paddingRight: component.padding,
            },
        });
    };

    return sheet;
};
