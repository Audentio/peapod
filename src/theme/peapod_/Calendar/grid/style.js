module.exports = function (sheet) {
    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            listStyle: 'none',
            width: '350px',
            background: '#fff',
            overflow: 'hidden',
            padding: 0,
            margin: theme.gutter.extrasmall,
        });
    };

    return sheet;
};
