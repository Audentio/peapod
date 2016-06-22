<<<<<<< HEAD
import { Sheet } from 'utility/stylesheet.js';
import headings from './presets.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
=======
module.exports = function (sheet) {
>>>>>>> Audentio/master
    const main = sheet.addMain();
    const h1 = sheet.addPart('h1');
    const h2 = sheet.addPart('h2');
    const h3 = sheet.addPart('h3');
    const h4 = sheet.addPart('h4');
    const h5 = sheet.addPart('h5');
    const h6 = sheet.addPart('h6');

    // Conditions
    sheet.addCondition('secondary').addStyler({ secondary: true });
    // sheet.addCondition('upper').addProp({ upper: true });
    // sheet.addCondition('weight').addProp({ weight: ['!=', undefined] });
    sheet.addCondition('upper').addFunction((instance) => {
        return instance.props.upper || (instance.props.preset && headings[instance.props.preset].upper);
    });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            textTransform: 'uppercase',
        };
        return component;
    };

<<<<<<< HEAD
    main.addSelector({
        common: {
            marginTop: 0,
            // fontWeight: '$font.weight.black',
            fontWeight(obj) {
                let weight = Pod_Vars.get('font.weight.black');
                if (obj.props.weight) {
                    weight = obj.props.weight;
                }
                if ((obj.props.preset && headings[obj.props.preset].weight)) {
                    weight = headings[obj.props.preset].weight;
                }
                return weight;
            },
        },
    }).addSelector({
        condition: ['upper'],
        common: {
            textTransform: 'uppercase',
        },
    });
=======
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
>>>>>>> Audentio/master

        const getMargin = (margin, font) => (parseFloat(margin) - parseFloat(font)) + 'rem';

<<<<<<< HEAD
    h1.addSelector({
        common: {
            fontSize: '$font.size.xxxlarge',
            marginBottom: getMargin('font.margins.xxxlarge', 'font.size.xsmall'),
        },
    }).addSelector({
        condition: ['secondary'],
        common: {
            marginBottom: '0px',
        },
    });

    h2.addSelector({
        common: {
            fontSize: '$font.size.xxlarge',
            marginBottom: getMargin('font.margins.xxlarge', 'font.size.xsmall'),
        },
    }).addSelector({
        condition: ['secondary'],
        common: {
            marginBottom: '0px',
        },
    });

    h3.addSelector({
        common: {
            fontSize: '$font.size.xlarge',
            marginBottom: getMargin('font.margins.xlarge', 'font.size.xsmall'),
        },
    }).addSelector({
        condition: ['secondary'],
        common: {
            marginBottom: '0px',
        },
    });

    h4.addSelector({
        common: {
            fontSize: '$font.size.large',
            marginBottom: getMargin('font.margins.large', 'font.size.xsmall'),
        },
    }).addSelector({
        condition: ['secondary'],
        common: {
            marginBottom: '0px',
        },
    });

    h5.addSelector({
        common: {
            fontSize: '$font.size.normal',
            marginBottom: getMargin('font.margins.normal', 'font.size.xsmall'),
        },
    }).addSelector({
        condition: ['secondary'],
        common: {
            marginBottom: '0px',
        },
    });

    h6.addSelector({
        common: {
            fontSize: '$font.size.small',
            marginBottom: getMargin('font.margins.small', 'font.size.xsmall'),
        },
    }).addSelector({
        condition: ['secondary'],
        common: {
            marginBottom: '0px',
        },
    });
=======
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
>>>>>>> Audentio/master

    return sheet;
};
