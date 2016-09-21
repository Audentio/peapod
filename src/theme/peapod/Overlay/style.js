module.exports = function (sheet) {
    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            backgroundColor: 'rgba(0,0,0,.4)',
            position: 'fixed',
            zIndex: theme.zIndex.level10,
            top: 0, right: 0,
            bottom: 0, left: 0,
        });
    };

    return sheet;
};
