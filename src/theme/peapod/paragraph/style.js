module.exports = function (sheet) {
    const main = sheet.addMain();

    // Conditions
    sheet.addCondition('secondary').addStyler({ secondary: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

<<<<<<< HEAD
    main.addSelector({
        common: {
            marginBottom: '$font.margins.xsmall',
            marginTop: 0,
            fontSize: '$font.size.xsmall',
            color: '$font.color.primary',
            lineHeight: '2.6rem',
            fontWeight: '$font.weight.light',
            display: 'inline-block',
        },
    }).addSelector({
        condition: ['secondary'],
        common: {
            marginBottom: '0px',
        },
    });
=======
    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                marginBottom: theme.font.margins.body1,
                marginTop: 0,
                fontSize: theme.font.size.body1,
                color: theme.font.color.primary,
                lineHeight: '2.6rem',
                fontWeight: theme.font.weight.light,
                display: 'inline-block',
            },
        }).addSelector({
            condition: ['secondary'],
            common: {
                marginBottom: '0px',
            },
        });
    };
>>>>>>> Audentio/master

    return sheet;
};
