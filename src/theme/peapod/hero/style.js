module.exports = function (sheet) {
    const main = sheet.addMain();

    // Conditions
    sheet.addCondition('cover').addStyler({ cover: true });
    sheet.addCondition('contain').addStyler({ contain: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                display: 'block',
                width: '100%',
                height: '100vh',
                backgroundPosition: 'center center',
                fontFamily: theme.font.family.primary,
            },
        }).addSelector({
            condition: ['cover'],
            common: {
                backgroundSize: 'cover',
            },
        }).addSelector({
            condition: ['contain'],
            common: {
                backgroundSize: 'contain',
            },
        });
    };

    return sheet;
};
