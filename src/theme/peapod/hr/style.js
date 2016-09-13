module.exports = function (sheet) {
    const main = sheet.addMain();

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            height: '1px',
            borderWidth: 0,
            backgroundColor: theme.palette.grey300,
            margin: `${theme.gutter.internal} auto`, // in case someone puts a width it will center
        });
    };

    return sheet;
};
