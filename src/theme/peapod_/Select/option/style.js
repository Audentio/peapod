module.exports = function (sheet) {
    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            fontWeight: 'bold',
        });
    };

    return sheet;
};
