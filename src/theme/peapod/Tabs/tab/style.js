module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('active').addProp({ active: true });
    sheet.addCondition('inactive').addProp({ active: false });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main.--inactive', {
            display: 'none',
        });
    };

    return sheet;
};
