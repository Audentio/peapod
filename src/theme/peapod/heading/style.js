module.exports = function (sheet) {
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
        sheet.selector('.main', {});

        const parts = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        const fontSizes = ['xxxlarge', 'xxlarge', 'xlarge', 'large', 'normal', 'small'];
        for (let i = 0, len = parts.length; i < len; i++) {
            const part = parts[i];

            sheet.selector(`.${part}`, {
                fontSize: theme.font.size[fontSizes[i]],
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

                    if (typeof(obj.props.preset) !== 'undefined' && typeof(obj.presets) !== 'undefined' && typeof(obj.presets[obj.props.preset]) !== 'undefined' && typeof(obj.presets[obj.props.preset].marginTop) !== 'undefined') {
                        margin = obj.presets[obj.props.preset].marginTop;
                    }
                    return margin;
                },
                marginBottom(obj) {
                    let margin = 0;
                    if (typeof(obj.props.preset) !== 'undefined' && typeof(obj.presets) !== 'undefined' && typeof(obj.presets[obj.props.preset]) !== 'undefined' && typeof(obj.presets[obj.props.preset].marginBottom) !== 'undefined') {
                        margin = presets[obj.props.preset].marginBottom;
                    }
                    return margin;
                },
            }).selector(`.${part}.--upper`, {
                textTransform: 'uppercase',
            });
        }
    };

    return sheet;
};
