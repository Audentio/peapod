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

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                fontWeight(obj) {
                    let weight = theme.font.weight.black;
                    if (obj.props.weight) {
                        weight = obj.props.weight;
                    }
                    if (obj.props.preset && presets[obj.props.preset] && presets[obj.props.preset].weight) {
                        weight = presets[obj.props.preset].weight;
                    }
                    return weight;
                },
                marginTop(obj) {
                    let margin = 0;
<<<<<<< HEAD

                    if (typeof(obj.props.preset) !== 'undefined' && typeof(obj.presets) !== 'undefined' && typeof(obj.presets[obj.props.preset]) !== 'undefined' && typeof(obj.presets[obj.props.preset].marginTop) !== 'undefined') {
                        margin = obj.presets[obj.props.preset].marginTop;
=======
                    if (obj.props.preset && presets[obj.props.preset] && presets[obj.props.preset].marginTop) {
                        margin = presets[obj.props.preset].marginTop;
>>>>>>> audentio/master
                    }
                    return margin;
                },
                marginBottom(obj) {
                    let margin = 0;
<<<<<<< HEAD
                    if (typeof(obj.props.preset) !== 'undefined' && typeof(obj.presets) !== 'undefined' && typeof(obj.presets[obj.props.preset]) !== 'undefined' && typeof(obj.presets[obj.props.preset].marginBottom) !== 'undefined') {
=======
                    if (obj.props.preset && presets[obj.props.preset] && presets[obj.props.preset].marginBottom) {
>>>>>>> audentio/master
                        margin = presets[obj.props.preset].marginBottom;
                    }
                    return margin;
                },
            },
        }).addSelector({
            condition: ['upper'],
            common: {
                textTransform: 'uppercase',
            },
        });

        const getMargin = (margin, font) => (parseFloat(margin) - parseFloat(font)) + 'rem';

        h1.addSelector({
            common: {
                fontSize: theme.font.size.xxxlarge,
                marginBottom: getMargin(theme.font.margins.xxxlarge, theme.font.size.xsmall),
            },
        }).addSelector({
            condition: ['secondary'],
            common: {
                marginBottom: '0px',
            },
        });

        h2.addSelector({
            common: {
                fontSize: theme.font.size.xxlarge,
                marginBottom: getMargin(theme.font.margins.xxlarge, theme.font.size.xsmall),
            },
        }).addSelector({
            condition: ['secondary'],
            common: {
                marginBottom: '0px',
            },
        });

        h3.addSelector({
            common: {
                fontSize: theme.font.size.xlarge,
                marginBottom: getMargin(theme.font.margins.xlarge, theme.font.size.xsmall),
            },
        }).addSelector({
            condition: ['secondary'],
            common: {
                marginBottom: '0px',
            },
        });

        h4.addSelector({
            common: {
                fontSize: theme.font.size.large,
                marginBottom: getMargin(theme.font.margins.large, theme.font.size.xsmall),
            },
        }).addSelector({
            condition: ['secondary'],
            common: {
                marginBottom: '0px',
            },
        });

        h5.addSelector({
            common: {
                fontSize: theme.font.size.normal,
                marginBottom: getMargin(theme.font.margins.normal, theme.font.size.xsmall),
            },
        }).addSelector({
            condition: ['secondary'],
            common: {
                marginBottom: '0px',
            },
        });

        h6.addSelector({
            common: {
                fontSize: theme.font.size.small,
                marginBottom: getMargin(theme.font.margins.small, theme.font.size.xsmall),
            },
        }).addSelector({
            condition: ['secondary'],
            common: {
                marginBottom: '0px',
            },
        });
    };

    return sheet;
};
