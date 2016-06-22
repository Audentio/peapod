import { Sheet } from 'utility/stylesheet.js';
import headings from './presets.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
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

    // Variables
    sheet.setValues({
        textTransform: 'uppercase',
    });

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

    const getMargin = (margin, font) => (parseFloat(Pod_Vars.get(margin)) - parseFloat(Pod_Vars.get(font))) + 'rem';

    h1.addSelector({
        common: {
            fontSize: '$font.size.display3',
            marginBottom: getMargin('font.margins.display3', 'font.size.body2'),
        },
    }).addSelector({
        condition: ['secondary'],
        common: {
            marginBottom: '0px',
        },
    });

    h2.addSelector({
        common: {
            fontSize: '$font.size.display2',
            marginBottom: getMargin('font.margins.display2', 'font.size.body2'),
        },
    }).addSelector({
        condition: ['secondary'],
        common: {
            marginBottom: '0px',
        },
    });

    h3.addSelector({
        common: {
            fontSize: '$font.size.display1',
            marginBottom: getMargin('font.margins.display1', 'font.size.body2'),
        },
    }).addSelector({
        condition: ['secondary'],
        common: {
            marginBottom: '0px',
        },
    });

    h4.addSelector({
        common: {
            fontSize: '$font.size.headline',
            marginBottom: getMargin('font.margins.headline', 'font.size.body2'),
        },
    }).addSelector({
        condition: ['secondary'],
        common: {
            marginBottom: '0px',
        },
    });

    h5.addSelector({
        common: {
            fontSize: '$font.size.title',
            marginBottom: getMargin('font.margins.title', 'font.size.body2'),
        },
    }).addSelector({
        condition: ['secondary'],
        common: {
            marginBottom: '0px',
        },
    });

    h6.addSelector({
        common: {
            fontSize: '$font.size.subheading',
            marginBottom: getMargin('font.margins.subheading', 'font.size.body2'),
        },
    }).addSelector({
        condition: ['secondary'],
        common: {
            marginBottom: '0px',
        },
    });

    return sheet;
};
