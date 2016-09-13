module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('vertical').addProp({ vertical: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main.--vertical', {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
        });
    };

    return sheet;
};
