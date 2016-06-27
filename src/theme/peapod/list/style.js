module.exports = function (sheet) {
    const main = sheet.addMain();

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                maxHeight: '100%',
                overflowX: 'hidden',
                overflowY: 'auto',
                borderTopWidth: '1px',
                borderBottomWidth: '1px',
                borderLeftWidth: '1px',
                borderRightWidth: '1px',
                borderStyle: 'solid',
                borderColor: theme.palette.grey200,
            },
        });
    };

    return sheet;
};
