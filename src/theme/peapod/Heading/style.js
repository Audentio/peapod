module.exports = function (sheet) {
    const kinds = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const presets = {
        main: {
            weight: '700',
            upper: false,
        },
    };

    sheet.addCondition('secondary').addStyler({ secondary: true });
    sheet.addCondition('upper', instance =>
        instance.props.upper || (instance.props.preset && presets[instance.props.preset].upper)
    );
    kinds.forEach(kind => {
        sheet.addCondition(kind, instance => instance.props.kind === kind);
    });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            textTransform: 'uppercase',
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {});

        const fontSize = {
            h1: 'xxxlarge',
            h2: 'xxlarge',
            h3: 'xlarge',
            h4: 'large',
            h5: 'normal',
            h6: 'small',
        };

        kinds.forEach(kind => {
            sheet.selector(`.main.--${kind}`, {
                fontSize: theme.font.size[fontSize[kind]],
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
            });
        });

        sheet.selector('.main.--upper', {
            textTransform: 'uppercase',
        });
    };

    return sheet;
};
