module.exports = function (sheet) {
    const main = sheet.addMain();

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                listStyle: 'none',
                width: '350px',
                background: '#fff',
                overflow: 'hidden',
                padding: 0,
                margin: theme.gutter.extrasmall,
            },
        });
    };

    return sheet;
};
