module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('horizontal').addProp({ orientation: 'horizontal' });
    sheet.addCondition('hidden').addProp({ hidden: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            padding: theme.gutter.small,
            width: '100%',
        }).selector('.main.--hidden', {
            display: 'none',
        });

        sheet.selector('.content', {
            width: '100%',
        });
    };

    return sheet;
};
