module.exports = function (sheet) {
    const main = sheet.addMain();

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                padding: '16px',
                borderBottom: '1px solid #ddd',
                background: '#fff',
            },
        });
    };

    return sheet;
};
