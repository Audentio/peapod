import Radium from 'radium';

const buttonKinds = ['base', 'general', 'primary', 'secondary', 'success', 'danger', 'warning', 'info'];

module.exports = function (sheet) {
    const main = sheet.addMain();
    const ripple = sheet.addPart('ripple');
    const rippleContainer = sheet.addPart('rippleContainer');

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

    for (const index in buttonKinds) {
        if (buttonKinds[index]) {
            const conditionName = `kind${buttonKinds[index].charAt(0).toUpperCase() + buttonKinds[index].slice(1)}`;

            sheet.addCondition(conditionName).addStyler({ kind: buttonKinds[index] });
        }
    }

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
                base: {
                    background: theme.color.primary.base,
                    color: theme.color.text.white,
                    active: theme.color.primary.active,
                    get primary() { return component.color.base.background; },
                    get secondary() { return component.color.base.color; },
                    hover: {
                        primary: theme.color.base.hover,
                        get secondary() { return component.color.text.light; },
                    },
                },
                general: {
                    primary: theme.color.general.base,
                    secondary: 'white',
                    hover: {
                        primary: theme.color.general.hover,
                        get secondary() { return component.color.text.dark; },
                    },
                },
                primary: {
                    primary: theme.color.primary.base,
                    get secondary() { return component.color.text.light; },
                    hover: {
                        primary: theme.color.primary.hover,
                        get secondary() { return component.color.text.dark; },
                    },
                },
                secondary: {
                    primary: theme.color.secondary.base,
                    get secondary() { return component.color.text.light; },
                    hover: {
                        primary: theme.color.secondary.hover,
                        get secondary() { return component.color.text.dark; },
                    },
                },
                warning: {
                    primary: theme.color.warning.base,
                    get secondary() { return component.color.text.dark; },
                    hover: {
                        primary: theme.color.warning.hover,
                        get secondary() { return component.color.text.dark; },
                    },
                },
                info: {
                    primary: theme.color.info.base,
                    get secondary() { return component.color.text.light; },
                    hover: {
                        primary: theme.color.info.hover,
                        get secondary() { return component.color.text.dark; },
                    },
                },
                danger: {
                    primary: theme.color.danger.base,
                    get secondary() { return component.color.text.light; },
                    hover: {
                        primary: theme.color.danger.hover,
                        get secondary() { return component.color.text.dark; },
                    },
                },
                success: {
                    primary: theme.color.success.base,
                    get secondary() { return component.color.text.light; },
                    hover: {
                        primary: theme.color.success.hover,
                        get secondary() { return component.color.text.dark; },
                    },
                },
            },
            border: {
                color: theme.border.color,
                radius: theme.border.radius.small,
                width: theme.border.width,
                style: theme.border.style,
            },
<<<<<<< HEAD
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
            size: '$font.size.xsmall',
            denseSize: '$font.size.small',
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
            position: 'relative',
            overflow: 'hidden', // prevent ripple overflow
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
            verticalAlign: 'middle',
            minWidth: '88px',
            boxSizing: 'border-box',

            borderWidth: '0px',
            borderStyle: 'solid',
            borderColor: 'transparent',

            color: '$button.color.base.color',
            backgroundColor: '$button.color.base.background',
        },
    })
    .addSelector({
        condition: ['large'],
        common: {
            height: '42px',
            lineHeight: '42px',
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

            lineHeight: '28px', // TODO: fix this

            borderWidth: '$border.width',
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
            minWidth: '0px',
            color: '$button.color.base.background',
            background: 'transparent',
            fontSize: '$font.size.large',
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
=======
            height: '36px',
            denseHeight: '32px',
            get lineHeight() { return component.height; },
            get denseLineHeight() { return component.denseHeight; },
            font: {
                family: theme.font.family.primary,
                size: theme.font.size.button,
                denseSize: theme.font.size.small,
                weight: theme.font.weight.medium,
            },
            transition: {
                duration: '150ms',
                scale: '0.92',
            },
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => {
        main.addSelector({
            common: {
                display: 'inline-block',
                borderRadius: component.border.radius,
                borderStyle: 'none',
                position: 'relative',
                overflow: 'hidden', // prevent ripple overflow
                textDecoration: 'none',
                textTransform: 'uppercase',
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
            },
        }).addSelector({
            condition: ['large'],
            common: {
                height: '42px',
                lineHeight: '42px',
            },
        }).addSelector({
            condition: ['dense'],
            common: {
                height: component.denseHeight,
                lineHeight: component.denseLineHeight,
                fontSize: component.font.denseSize,
            },
        }).addSelector({
            condition: ['dialog'],
            common: {
                paddingLeft: theme.gutter.extrasmall,
                paddingRight: theme.gutter.extrasmall,
                marginLeft: theme.gutter.extrasmall,
                marginRight: theme.gutter.extrasmall,
                minWidth: '64px',
            },
        }).addSelector({
            condition: ['text'],
            common: {
                color: component.color.base.background,
                backgroundColor: 'transparent',
            },
        }).addSelector({
            condition: ['bordered'],
            common: {
                backgroundColor: 'transparent',
                color: component.color.base.background,
>>>>>>> Audentio/master

                lineHeight: '28px', // TODO: fix this
                borderWidth: '$border.width',
                borderStyle: 'solid',
                borderColor: component.color.base.background,
            },
        }).addSelector({
            condition: ['icon'],
            common: {
                paddingTop: '0px',
                paddingBottom: '0px',
                paddingLeft: '4px',
                paddingRight: '4px',
                minWidth: '0px',
                color: component.color.base.background,
                background: 'transparent',
                fontSize: theme.font.size.headline,
            },
        }).addSelector({
            condition: ['notDisabled'],
            common: {
                cursor: 'pointer',
            },
        }).addSelector({
            condition: 'disabled',
            common: {
                cursor: 'not-allowed',
                opacity: theme.opacity.notAllowed,
            },
        }).addSelector({
            condition: ['raised'],
            common: {
                boxShadow: theme.shadows.d1,
            },
        }).addSelector({
            condition: ['block'],
            common: {
                display: 'block',
            },
        }).addSelector({
            condition: ['round'],
            common: {
                borderRadius: '1000px',
            },
        });

        for (const index in buttonKinds) {
            if (buttonKinds[index]) {
                const conditionName = `kind${buttonKinds[index].charAt(0).toUpperCase() + buttonKinds[index].slice(1)}`;

                // button
                main.addSelector({
                    condition: [conditionName],
                    common: {
                        backgroundColor: component.color[buttonKinds[index]].primary,
                        color: component.color[buttonKinds[index]].secondary,
                    },
                }).addSelector({
                    condition: [conditionName, 'notDisabled'],
                    common: {
                        ':hover': {
                            backgroundColor: component.color[buttonKinds[index]].hover.primary,
                            color: component.color[buttonKinds[index]].hover.secondary,
                        },
                    },
                })
                // text
                .addSelector({
                    condition: ['text', conditionName],
                    common: {
                        backgroundColor: 'transparent',
                        color: component.color[buttonKinds[index]].primary,
                    },
                }).addSelector({
                    condition: ['text', conditionName, 'notDisabled'],
                    common: {
                        ':hover': {
                            backgroundColor: 'transparent',
                            color: component.color[buttonKinds[index]].hover.primary,
                        },
                    },
                })
                // bordered text
                .addSelector({
                    condition: ['bordered', conditionName],
                    common: {
                        backgroundColor: 'transparent',
                        color: component.color[buttonKinds[index]].primary,
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: component.color[buttonKinds[index]].primary,
                    },
                }).addSelector({
                    condition: ['bordered', conditionName, 'notDisabled'],
                    common: {
                        ':hover': {
                            backgroundColor: 'transparent',
                            color: component.color[buttonKinds[index]].primary,
                            borderWidth: '2px',
                            borderStyle: 'solid',
                            borderColor: component.color[buttonKinds[index]].primary,
                        },
                    },
                });
            }
        }

        rippleContainer.addSelector({
            common: {
                position: 'absolute',
                top: 0, left: 0,
                pointerEvents: 'none',
                width: '100%',
                height: '100%',
                borderRadius: 'inherit',
                WebkitMaskImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC)',
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
    };

    return sheet;
};
