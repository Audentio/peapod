module.exports = function (sheet) {
    const main = sheet.addMain();

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            color: {
                base: theme.color.primary.base,
                hover: theme.color.primary.hover,
                active: theme.color.primary.active,
            },
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                color: component.color.base,
                textDecoration: 'none',

                ':hover': {
                    color: component.color.hover,
                },

                ':active': {
                    color: component.color.active,
                },
            },
        });
    };

    return sheet;
};
