module.exports = function (sheet) {
    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            padding: '16px',
            borderBottom: '1px solid #ddd',
            background: '#fff',
        });
    };

    return sheet;
};
