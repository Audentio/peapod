const buttons = {
    general: {
        primary: '$color.general.base',
        secondary: 'white',

        hover: {
            primary: '$color.general.hover',
            secondary: '$button.color.text.dark',
        },
    },
    base: {
        primary: '$button.color.base.background',
        secondary: '$button.color.base.color',

        hover: {
            primary: '$color.base.hover',
            secondary: '$button.color.text.light',
        },
    },
    primary: {
        primary: '$color.primary.base',
        secondary: '$button.color.text.light',

        hover: {
            primary: '$color.primary.hover',
            secondary: '$button.color.text.dark',
        },
    },
    warning: {
        primary: '$color.warning.base',
        secondary: '$button.color.text.dark',

        hover: {
            primary: '$color.warning.hover',
            secondary: '$button.color.text.dark',
        },
    },
    info: {
        primary: '$color.info.base',
        secondary: '$button.color.text.light',

        hover: {
            primary: '$color.info.hover',
            secondary: '$button.color.text.dark',
        },
    },
    danger: {
        primary: '$color.danger.base',
        secondary: '$button.color.text.light',

        hover: {
            primary: '$color.danger.hover',
            secondary: '$button.color.text.dark',
        },
    },
    success: {
        primary: '$color.success.base',
        secondary: '$button.color.text.light',

        hover: {
            primary: '$color.success.hover',
            secondary: '$button.color.text.dark',
        },
    },
};

module.exports = buttons;
