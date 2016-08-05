module.exports = function (sheet) {
    const main = sheet.addMain();

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                fontWeight: 'bold',
            },
        });
    };

    return sheet;
};
