module.exports = function (sheet) {
    const main = sheet.addMain();
    const h1 = sheet.addPart('h1');
    const h2 = sheet.addPart('h2');
    const h3 = sheet.addPart('h3');
    const h4 = sheet.addPart('h4');
    const h5 = sheet.addPart('h5');
    const h6 = sheet.addPart('h6');

    const presets = {
        main: {
            weight: '700',
            upper: false,
        },
    };

    // Conditions
    sheet.addCondition('secondary').addStyler({ secondary: true });
    // sheet.addCondition('upper').addProp({ upper: true });
    // sheet.addCondition('weight').addProp({ weight: ['!=', undefined] });
    sheet.addCondition('upper').addFunction(instance =>
        instance.props.upper || (instance.props.preset && presets[instance.props.preset].upper)
    );

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            textTransform: 'uppercase',
        };
        return component;
    };
    return sheet;
};
