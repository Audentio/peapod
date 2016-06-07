import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Conditions
    sheet.addCondition('secondary').addStyler({ secondary: true });

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            marginBottom: '$font.margins.body1',
            marginTop: 0,
            fontSize: '$font.size.body1',
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

    return sheet;
};
