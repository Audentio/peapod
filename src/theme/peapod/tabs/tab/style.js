module.exports = function (sheet) {
    const main = sheet.addMain();

    // Conditions
    sheet.addCondition('active').addProp({ active: true });
    sheet.addCondition('inactive').addProp({ active: false });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            condition: ['inactive'],
            common: {
                display: 'none',
            },
        });
    };

    return sheet;
};
