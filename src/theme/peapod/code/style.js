module.exports = function (sheet) {
    const main = sheet.addMain();

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                backgroundColor: theme.palette.blue50,
                color: theme.palette.blue700,
                padding: '1px 2px',
                fontSize: '85%',
                fontFamily: theme.font.family.code,
            },
        });
    };

    return sheet;
};
