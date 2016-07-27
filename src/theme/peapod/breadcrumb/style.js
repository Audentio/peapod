module.exports = function (sheet) {
    const main = sheet.addMain();
    const listitem = sheet.addPart('listitem');

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                height: theme.gutter.extralarge,
                lineHeight: theme.gutter.extralarge,
                background: 'white',
                paddingLeft: theme.gutter.extrasmall,
                paddingRight: theme.gutter.extrasmall,
                borderRadius: theme.border.radius.small,
                color: theme.palette.grey500,
            },
        });

        listitem.addSelector({
            common: {
                height: theme.gutter.extralarge,
                display: 'inline-block',
                paddingLeft: theme.gutter.extrasmall,
                paddingRight: theme.gutter.extrasmall,
            },
        });
    };

    return sheet;
};
