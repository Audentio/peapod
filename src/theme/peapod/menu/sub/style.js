module.exports = function (sheet) {
    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            background: '#fff',
            boxShadow: theme.shadows.d1,
            padding: '16px 0',
            borderRadius: theme.border.radius.small,
            zIndex: 3,
            position: 'absolute',
            whiteSpace: 'nowrap',
            transform: 'translate(0, -48px)',
            left: '100%',
        });
    };

    return sheet;
};
