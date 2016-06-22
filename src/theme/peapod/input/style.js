import Radium from 'radium';

module.exports = function (sheet) {
    const main = sheet.addMain();
    const input = sheet.addPart('input');
    const pseudoInput = sheet.addPart('pseudoInput');
    const placeholder = sheet.addPart('placeholder');
    const charCounter = sheet.addPart('charCounter');
    const evaluation = sheet.addPart('evaluation');
    const wrapper = sheet.addPart('wrapper');

    const bouncy = {
        '0%': { transform: 'matrix3d(0.5, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '3.4%': { transform: 'matrix3d(0.658, 0, 0, 0, 0, 0.703, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '4.7%': { transform: 'matrix3d(0.725, 0, 0, 0, 0, 0.8, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '6.81%': { transform: 'matrix3d(0.83, 0, 0, 0, 0, 0.946, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '9.41%': { transform: 'matrix3d(0.942, 0, 0, 0, 0, 1.084, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '10.21%': { transform: 'matrix3d(0.971, 0, 0, 0, 0, 1.113, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '13.61%': { transform: 'matrix3d(1.062, 0, 0, 0, 0, 1.166, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '14.11%': { transform: 'matrix3d(1.07, 0, 0, 0, 0, 1.165, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '17.52%': { transform: 'matrix3d(1.104, 0, 0, 0, 0, 1.12, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '18.72%': { transform: 'matrix3d(1.106, 0, 0, 0, 0, 1.094, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '21.32%': { transform: 'matrix3d(1.098, 0, 0, 0, 0, 1.035, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '24.32%': { transform: 'matrix3d(1.075, 0, 0, 0, 0, 0.98, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '25.23%': { transform: 'matrix3d(1.067, 0, 0, 0, 0, 0.969, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '29.03%': { transform: 'matrix3d(1.031, 0, 0, 0, 0, 0.948, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '29.93%': { transform: 'matrix3d(1.024, 0, 0, 0, 0, 0.949, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '35.54%': { transform: 'matrix3d(0.99, 0, 0, 0, 0, 0.981, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '36.74%': { transform: 'matrix3d(0.986, 0, 0, 0, 0, 0.989, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '41.04%': { transform: 'matrix3d(0.98, 0, 0, 0, 0, 1.011, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '44.44%': { transform: 'matrix3d(0.983, 0, 0, 0, 0, 1.016, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '52.15%': { transform: 'matrix3d(0.996, 0, 0, 0, 0, 1.003, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '59.86%': { transform: 'matrix3d(1.003, 0, 0, 0, 0, 0.995, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '63.26%': { transform: 'matrix3d(1.004, 0, 0, 0, 0, 0.996, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '75.28%': { transform: 'matrix3d(1.001, 0, 0, 0, 0, 1.002, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '85.49%': { transform: 'matrix3d(0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '90.69%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
        '100%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    };

    const bounceKeyframes = Radium.keyframes(bouncy, 'bounce');

    sheet.addCondition('focused').addState({ focus: true });
    sheet.addCondition('type-textarea').addProp({ type: 'textarea' });
    sheet.addCondition('showCounter').addProp({ showCounter: true });
    sheet.addCondition('evaluation-valid').addState({ evaluation: 'valid' });
    sheet.addCondition('evaluation-invalid').addState({ evaluation: 'invalid' });
    sheet.addCondition('evaluation-empty').addState({ evaluation: 'empty' }); // only when "required" is true

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            color: {
                text: theme.color.text.base,
                placeholder: 'rgba(0,0,0,0.3)',
                background: 'transparent',
                backgroundFocus: 'transparent',
                get icon() { return component.color.text; },
            },
            textIndent: 0,
            height: theme.gutter.large,
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
            textareaPadding: {
                top: 10,
                right: 0,
                bottom: 10,
                left: 0,
            },
            border: {
                color: theme.palette.blue400,
                radius: '0px',
                width: '0px 0px 2px',
                style: 'solid',
            },
            font: {
                family: 'inherit',
                size: theme.font.size.large,
            },
        };
        return component;
    };

    sheet.resolveSceneValues = (common, theme) => { // eslint-disable-line no-unused-vars
        const component = {
            dark: {
                color: {
                    text: theme.color.text.white,
                    get placeholder() { return component.dark.color.text; },
                    background: 'transparent',
                    backgroundFocus: 'rgba(255, 255, 255, 0.1)',
                    get icon() { return component.dark.color.text; },
                },
                border: {
                    color: theme.palette.grey200,
                },
            },
            material: {
                color: {
                    background: 'transparent',
                },
                border: {
                    width: '0px 0px 1px 0px',
                },
            },
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        wrapper.addSelector({
            common: {
                display: 'inline-block',
            },
        });

        main.addSelector({
            common: {
                height: component.height,
                display: 'inline-block',
                position: 'relative',
                color: component.color.text,
                backgroundColor: component.color.background,
                borderWidth: '0px 0px 2px',
                borderStyle: component.border.style,
                borderColor: theme.palette.grey300,
                borderRadius: component.border.radius,
                marginBottom: theme.gutter.extrasmall,
                transition: 'border-color 100ms',
            },
        })
        .addSelector({
            condition: 'type-textarea',
            common: {
                display: 'block',
                width: '500px',
                height: 'auto',
            },
        })
        .addSelector({
            condition: ['type-textarea', 'showCounter'],
            common: {
                marginBottom: 30,
            },
        })
        .addSelector({
            condition: 'focused',
            common: {
                borderColor: theme.color.primary.base,
                borderWidth: '0px 0px 2px 0px',
            },
        })
        .addSelector({
            condition: 'evaluation-valid',
            common: {
                backgroundColor: 'transparent',
                borderColor: theme.color.success.base,
            },
        })
        .addSelector({
            condition: ['evaluation-invalid'],
            common: {
                backgroundColor: 'transparent',
                borderColor: theme.color.danger.base,
            },
        })

        .addSelector({
            condition: ['evaluation-empty'],
            common: {
                backgroundColor: 'transparent',
                borderColor: theme.color.danger.base,
            },
        });

        input.addSelector({
            common: {
                display: 'none',
            },
        });

        pseudoInput.addSelector({
            common: {
                lineHeight: component.height,
                height: component.height,
                width: 150,
                minWidth: '100%',
                maxWidth: '100%',
                paddingTop: component.padding.top,
                paddingRight: component.padding.right,
                paddingBottom: component.padding.bottom,
                paddingLeft: component.padding.left,
                verticalAlign: 'middle',
                textIndent: component.textIndent,
                background: 'transparent',
                fontSize: theme.font.size.large,
                color: 'inherit',
                appearance: 'none',
                border: 'none',
                outline: 'none',
                position: 'relative',
                zIndex: 2,
                transition: 'padding 100ms',
            },
        }).addSelector({
            condition: 'type-textarea',
            common: {
                maxWidth: '100%',
                paddingTop: component.textareaPadding.top,
                paddingBottom: component.textareaPadding.bottom,
            },
        }).addSelector({
            condition: 'focused',
            common: {
                paddingLeft: '0px',
            },
        });

        placeholder.addSelector({
            common: {
                lineHeight: component.height,
                position: 'absolute',
                width: '100%',
                height: '100%',
                paddingRight: component.padding.right,
                paddingLeft: component.padding.left,
                textIndent: component.textIndent,
                zIndex: 1,
                color: component.color.placeholder,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                fontSize: theme.font.size.large,
                transition: 'padding 100ms',
            },
        })
        .addSelector({
            condition: 'type-textarea',
            common: {
                lineHeight: 'normal',
                height: '100%',
                paddingTop: component.textareaPadding.top,
                paddingBottom: component.textareaPadding.bottom,
            },
        })
        .addSelector({
            condition: 'focused',
            common: {
                paddingLeft: '0px',
            },
        });

        evaluation.addSelector({
            common: {
                display: 'block',
                padding: '6px 0 0',
                borderRadius: theme.border.radius.small,
                fontSize: theme.font.size.xsmall,
                // backgroundColor: '$palette.grey100',
                // position: 'absolute',
                // marginLeft: '$gutter.internal',
                // marginTop: 7,
                // left: '100%',
                // top: 0,
                color: theme.palette.grey100,
                // fontWeight: 'bold',
                whiteSpace: 'nowrap',
            },
        })
        .addSelector({
            condition: 'evaluation-invalid',
            common: {
                animation: 'x 500ms 0s 1',
                animationName: bounceKeyframes,
                color: theme.color.danger.base,
            },
        })
        .addSelector({
            condition: 'evaluation-empty',
            common: {
                animation: 'x 500ms 0s 1',
                animationName: bounceKeyframes,
                color: theme.color.danger.base,
            },
        })
        .addSelector({
            condition: 'evaluation-valid',
            common: {
                animation: 'x 500ms 0s 1',
                animationName: bounceKeyframes,
                color: theme.color.success.base,
            },
        });

        charCounter.addSelector({
            common: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                marginBottom: -25,
            },
        });
    };

    return sheet;
};
