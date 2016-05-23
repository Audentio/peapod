import { Sheet } from 'stylesheet.js';
import Radium from 'radium';
import buttons from './presets.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const ripple = sheet.addPart('ripple');
    const rippleContainer = sheet.addPart('rippleContainer');

    // Conditions
    sheet.addCondition('raised').addStyler({ raised: true });
    sheet.addCondition('block').addStyler({ block: true });
    sheet.addCondition('round').addStyler({ round: true });
    sheet.addCondition('disabled').addStyler({ disabled: true });
    sheet.addCondition('notDisabled').addStyler({ disabled: undefined });
    sheet.addCondition('dense').addStyler({ dense: true });
    sheet.addCondition('dialog').addStyler({ dialog: true });

    sheet.addCondition('icon').addStyler({ type: 'icon' });
    sheet.addCondition('text').addStyler({ type: 'text' });
    sheet.addCondition('bordered').addStyler({ type: 'bordered' });

    const rippleSteps = {
        '100%': {
            borderRadius: '100%',
            opacity: 0,
            transform: 'scale(2.5)',
        },
    };

    const rippleAnimation = Radium.keyframes(rippleSteps, 'rippleAnimation');

    // Variables
    sheet.setValues({
        color: {
            text: {
                light: '$color.text.white',
                dark: '$color.text.dark',
            },
            base: {
                background: '$color.primary.base',
                color: '$color.text.white',
                hover: '$color.primary.hover',
                active: '$color.primary.active',
            },
        },
        border: {
            color: '$border.color',
            radius: '$border.radius.small',
            width: '$border.width',
            style: '$border.style',
        },
        height: '36px',
        denseHeight: '32px',
        lineHeight: '$button.height',
        denseLineHeight: '$button.denseHeight',
        font: {
            family: '$font.family.primary',
            size: '14px',
            denseSize: '13px',
            weight: '$font.weight.medium',
        },
        transition: {
            duration: '150ms',
            scale: '0.92',

        },
    });


    main.addSelector({
        common: {
            display: 'inline-block',
            borderRadius: '$button.border.radius',
            border: 'none',
            position: 'relative',
            overflow: 'hidden', // prevent ripple overflow
            WebkitMaskImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC)', // webkit bug with overflow & borderRadius
            textDecoration: 'none',
            textTransform: 'uppercase',
            fontFamily: '$button.font.family',
            fontSize: '$button.font.size',
            fontWeight: '$button.font.weight',
            lineHeight: '$button.lineHeight',
            paddingTop: '0px',
            paddingBottom: '0px',
            paddingLeft: '$gutter.internal',
            paddingRight: '$gutter.internal',
            height: '$button.height',
            textAlign: 'center',
            outline: 'none',
            userSelect: 'none',
            verticalAlign: 'bottom',

            minWidth: '88px',

            color: '$button.color.base.color',
            backgroundColor: '$button.color.base.background',
        },
    })
    .addSelector({
        condition: ['dense'],
        common: {
            height: '$button.denseHeight',
            lineHeight: '$button.denseLineHeight',
            fontSize: '$button.font.denseSize',
        },
    })
    .addSelector({
        condition: ['dialog'],
        common: {
            paddingLeft: '$gutter.extrasmall',
            paddingRight: '$gutter.extrasmall',
            marginLeft: '$gutter.extrasmall',
            marginRight: '$gutter.extrasmall',
            minWidth: '64px',
        },
    })
    .addSelector({
        condition: ['text'],
        common: {
            color: '$button.color.base.background',
            backgroundColor: 'transparent',
        },
    })
    .addSelector({
        condition: ['bordered'],
        common: {
            backgroundColor: 'transparent',
            color: '$button.color.base.background',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: '$button.color.base.background',
        },
    })
    .addSelector({
        condition: ['icon'],
        common: {
            paddingTop: '0px',
            paddingBottom: '0px',
            paddingLeft: '4px',
            paddingRight: '4px',
            minWidth: 'auto',
            color: '$button.color.base.background',
            background: 'transparent',
            fontSize: '$font.size.headline',
        },
    })
    .addSelector({
        condition: ['notDisabled'],
        common: {
            cursor: 'pointer',
        },
    })
    .addSelector({
        condition: 'disabled',
        common: {
            cursor: 'not-allowed',
            opacity: '$opacity.notAllowed',
        },
    })
    .addSelector({
        condition: ['raised'],
        common: {
            boxShadow: '$shadows.d1',
        },
    })
    .addSelector({
        condition: ['block'],
        common: {
            display: 'block',
        },
    })
    .addSelector({
        condition: ['round'],
        common: {
            borderRadius: '1000px',
        },
    });


    for (let index in buttons) {
        const conditionName = `kind${index.charAt(0).toUpperCase() + index.slice(1)}`;

        sheet.addCondition(conditionName).addStyler({ kind: index });

        // button
        main.addSelector({
            condition: [conditionName],
            common: {
                backgroundColor: buttons[index].primary,
                color: buttons[index].secondary,
            },
        }).addSelector({
            condition: [conditionName, 'notDisabled'],
            common: {
                ':hover': {
                    backgroundColor: buttons[index].hover.primary,
                    color: buttons[index].hover.secondary,
                },
            },
        })
        // text
        .addSelector({
            condition: ['text', conditionName],
            common: {
                backgroundColor: 'transparent',
                color: buttons[index].primary,
            },
        }).addSelector({
            condition: ['text', conditionName, 'notDisabled'],
            common: {
                ':hover': {
                    backgroundColor: 'transparent',
                    color: buttons[index].hover.primary,
                },
            },
        })
        // bordered text
        .addSelector({
            condition: ['bordered', conditionName],
            common: {
                backgroundColor: 'transparent',
                color: buttons[index].primary,
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: buttons[index].primary,
            },
        }).addSelector({
            condition: ['bordered', conditionName, 'notDisabled'],
            common: {
                ':hover': {
                    backgroundColor: 'transparent',
                    color: buttons[index].hover.primary,
                    borderColor: buttons[index].hover.primary,
                },
            },
        });
    }

    rippleContainer.addSelector({
        common: {
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            width: '100%',
            height: '100%',
        },
    })
    .addSelector({
        condition: 'disabled',
        common: {
            display: 'none',
        },
    });

    ripple.addSelector({
        common: {
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '100%',
            transform: 'scale(0)',
            transformOrigin: 'center 50%',
            display: 'block',
            position: 'absolute',
            animation: 'x 850ms ease-out',
            animationName: rippleAnimation,
        },
    });

    return sheet;
};
