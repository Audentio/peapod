module.exports = function (sheet) {
    const main = sheet.addMain();
    const content = sheet.addPart('content');

    // Conditions
    sheet.addCondition('horizontal').addProp({ orientation: 'horizontal' });
    sheet.addCondition('hidden').addProp({ hidden: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                padding: theme.gutter.small,
                width: '100%',
                // background: '#fafafa',
            },
        }).addSelector({
            condition: ['hidden'],
            common: {
                display: 'none',
                // background: '#fafafa',
            },
        });

        content.addSelector({
            common: {
                width: '100%',
                // background: '#fafafa',
            },
        });
    };

    return sheet;
};
