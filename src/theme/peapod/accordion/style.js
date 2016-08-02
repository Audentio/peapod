module.exports = function (sheet) {
    const main = sheet.addMain();

    // Conditions
    sheet.addCondition('vertical').addProp({ vertical: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            condition: ['vertical'],
            common: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
            },
        });
    };

    return sheet;
};
