module.exports = function (sheet) {
    const main = sheet.addMain();

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                color: theme.table.color.controls.color,
                background: theme.table.color.controls.background,
                // height: '64px',
                // lineHeight: '64px',
            },
        });
    };

    return sheet;
};
