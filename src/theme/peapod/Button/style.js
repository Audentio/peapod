import Radium from 'radium';
// import _upperFirst from 'lodash/upperFirst';
import colorjs from 'color';

const kinds = ['base', 'general', 'primary', 'secondary', 'success', 'danger', 'warning', 'info'];

module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('raised').addStyler({ raised: true });
    sheet.addCondition('block').addStyler({ block: true });
    sheet.addCondition('round').addStyler({ round: true });

    sheet.addCondition('disabled').addStyler({ disabled: true });
    sheet.addCondition('notDisabled').addStyler({ disabled: ['!=', true] });

    sheet.addCondition('dense').addStyler({ dense: true });
    sheet.addCondition('dialog').addStyler({ dialog: true });
    sheet.addCondition('large').addStyler({ large: true });


    sheet.addCondition('icon').addStyler({ type: 'icon' });
    sheet.addCondition('text').addStyler({ type: 'text' });
    sheet.addCondition('bordered').addStyler({ type: 'bordered' });

    // Add condition for each kind
    kinds.forEach(kind => {
        sheet.addCondition(`kind_${kind}`, instance => instance.props.kind === kind);
    });

    const rippleSteps = {
        '100%': {
            borderRadius: '100%',
            opacity: 0,
            transform: 'scale(2.5)',
        },
    };

    const rippleAnimation = Radium.keyframes(rippleSteps, 'rippleAnimation');

    // Variables
    sheet.resolveValues = theme => {
        const component = {
            color: {
                text: {
                    light: theme.color.text.white,
                    dark: theme.color.text.dark,
                },
            },
        };

        // Add variables for each kind
        kinds.forEach(kind => {
            const currentColor = colorjs(theme.color[kind].base);

            component.color[kind] = {
                base: {
                    background: theme.color[kind].base,

                    // Text color. named "color" so this whole object can be directly applied
                    color: currentColor.luminosity() < 0.5 ? 'white' : 'black',
                },
                hover: {
                    background: currentColor.lighten(0.1).rgbString(),
                },
                active: {
                    background: currentColor.darken(0.1).rgbString(),
                },
            };
        });

        Object.assign(component, {
            border: {
                color: theme.border.color,
                radius: theme.border.radius.small,
                width: theme.border.width,
                style: theme.border.style,
            },
            height: '36px',
            denseHeight: '32px',
            get lineHeight() { return component.height; },
            get denseLineHeight() { return component.denseHeight; },
            font: {
                family: theme.font.family.primary,
                size: theme.font.size.xsmall,
                denseSize: theme.font.size.xsmall,
                weight: theme.font.weight.medium,
            },
            transition: {
                duration: '150ms',
                scale: '0.92',
            },
        });

        return component;
    };

    sheet.resolveStyles = (component, theme) => {
        sheet.selector('.main', {
            display: 'inline-block',
            borderRadius: component.border.radius,
            borderStyle: 'none',
            position: 'relative',
            overflow: 'hidden', // prevent ripple overflow
            textDecoration: 'none',
            // textTransform: 'uppercase',
            fontFamily: component.font.family,
            fontSize: component.font.size,
            fontWeight: component.font.weight,
            lineHeight: component.lineHeight,
            paddingTop: '0px',
            paddingBottom: '0px',
            paddingLeft: theme.gutter.internal,
            paddingRight: theme.gutter.internal,
            height: component.height,
            textAlign: 'center',
            outline: 'none',
            userSelect: 'none',
            verticalAlign: 'middle',
            minWidth: '88px',
            color: component.color.base.color,
            backgroundColor: component.color.base.background,
            transition: '150ms',
        }).selector('.main.--large', {
            height: '42px',
            lineHeight: '42px',
        }).selector('.main.--dense', {
            height: component.denseHeight,
            lineHeight: component.denseLineHeight,
            fontSize: component.font.denseSize,
        }).selector('.main.--dialog', {
            paddingLeft: theme.gutter.extrasmall,
            paddingRight: theme.gutter.extrasmall,
            marginLeft: theme.gutter.extrasmall,
            marginRight: theme.gutter.extrasmall,
            minWidth: '64px',
        }).selector('.main.--text', {
            color: component.color.base.background,
            backgroundColor: 'transparent',
        }).selector('.main.--bordered', {
            backgroundColor: 'transparent',
            color: component.color.base.background,
            lineHeight: '28px', // TODO: fix this
            borderWidth: theme.border.width,
            borderStyle: 'solid',
            borderColor: component.color.base.background,
        }).selector('.main.--icon', {
            paddingTop: '0px',
            paddingBottom: '0px',
            paddingLeft: '4px',
            paddingRight: '4px',
            minWidth: '0px',
            color: component.color.base.background,
            background: 'transparent',
            fontSize: theme.font.size.large,
        }).selector('.main.--notDisabled', {
            cursor: 'pointer',
        }).selector('.main.--disabled', {
            cursor: 'not-allowed',
            opacity: theme.opacity.notAllowed,
        }).selector('.main.--raised', {
            boxShadow: theme.shadows.d1,
        }).selector('.main.--block', {
            display: 'block',
        }).selector('.main.--round', {
            borderRadius: '1000px',
        });

        kinds.forEach(kind => {
            sheet.selector(`.main.--kind_${kind}`, {
                ...component.color[kind].base,
                ':hover': component.color[kind].hover,
                ':active': component.color[kind].active,
            });
        });

        sheet.selector('.rippleContainer', {
            position: 'absolute',
            top: 0, left: 0,
            pointerEvents: 'none',
            width: '100%',
            height: '100%',
            borderRadius: 'inherit',
            WebkitMaskImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC)',
        }).selector('.rippleContainer.--disabled', {
            display: 'none',
        });

        sheet.selector('.ripple', {
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '100%',
            transform: 'scale(0)',
            transformOrigin: 'center 50%',
            display: 'block',
            position: 'absolute',
            animation: 'x 850ms ease-out',
            animationName: rippleAnimation,
        });
    };

    return sheet;
};
