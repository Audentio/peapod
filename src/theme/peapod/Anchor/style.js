module.exports = function (sheet) {
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
        sheet.selector('.main', {
            color: component.color.base,
            textDecoration: 'none',
            cursor: 'pointer',
            ':hover': {
                color: component.color.hover,
            },
            ':active': {
                color: component.color.active,
            },
        });
    };

    return sheet;
};
