module.exports = function (sheet) {
    const main = sheet.addMain();

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            font: {
                family: theme.font.family.primary,
            },
            dropdown: {
                width: '20rem',
            },
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                fontFamily: component.font.family,
                width: component.dropdown.width,
            },
        });
    };

    return sheet;
};
