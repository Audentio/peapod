module.exports = function (sheet) {
    const main = sheet.addMain();
    const h1 = sheet.addPart('h1');
    const h2 = sheet.addPart('h2');
    const h3 = sheet.addPart('h3');
    const h4 = sheet.addPart('h4');
    const h5 = sheet.addPart('h5');
    const h6 = sheet.addPart('h6');

    // Conditions
    sheet.addCondition('secondary').addStyler({ secondary: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            textTransform: 'uppercase',
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                marginTop: 0,
                // fontWeight: '$font.weight.black',
                fontWeight(obj) {
                    return obj.props.weight || theme.font.weight.black;
                },
                textTransform(obj) {
                    return (obj.props.upper) ? 'uppercase' : 'none';
                },
            },
        });

        const getMargin = (margin, font) => (parseFloat(margin) - parseFloat(font)) + 'rem';

        h1.addSelector({
            common: {
                fontSize: theme.font.size.display3,
                marginBottom: getMargin(theme.font.margins.display3, theme.font.size.body2),
            },
        }).addSelector({
            condition: ['secondary'],
            common: {
                marginBottom: '0px',
            },
        });

        h2.addSelector({
            common: {
                fontSize: theme.font.size.display2,
                marginBottom: getMargin(theme.font.margins.display2, theme.font.size.body2),
            },
        }).addSelector({
            condition: ['secondary'],
            common: {
                marginBottom: '0px',
            },
        });

        h3.addSelector({
            common: {
                fontSize: theme.font.size.display1,
                marginBottom: getMargin(theme.font.margins.display1, theme.font.size.body2),
            },
        }).addSelector({
            condition: ['secondary'],
            common: {
                marginBottom: '0px',
            },
        });

        h4.addSelector({
            common: {
                fontSize: theme.font.size.headline,
                marginBottom: getMargin(theme.font.margins.headline, theme.font.size.body2),
            },
        }).addSelector({
            condition: ['secondary'],
            common: {
                marginBottom: '0px',
            },
        });

        h5.addSelector({
            common: {
                fontSize: theme.font.size.title,
                marginBottom: getMargin(theme.font.margins.title, theme.font.size.body2),
            },
        }).addSelector({
            condition: ['secondary'],
            common: {
                marginBottom: '0px',
            },
        });

        h6.addSelector({
            common: {
                fontSize: theme.font.size.subheading,
                marginBottom: getMargin(theme.font.margins.subheading, theme.font.size.body2),
            },
        }).addSelector({
            condition: ['secondary'],
            common: {
                marginBottom: '0px',
            },
        });
    };

    return sheet;
};
