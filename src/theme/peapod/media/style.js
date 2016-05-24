import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const figure = sheet.addPart('figure');
    const content = sheet.addPart('content');

    // Conditions
    sheet.addCondition('figureTop').addProp({ figureVertical: 'top' });
    sheet.addCondition('figureMiddle').addProp({ figureVertical: 'middle' });
    sheet.addCondition('figureBottom').addProp({ figureVertical: 'bottom' });

    sheet.addCondition('contentTop').addProp({ contentVertical: 'top' });
    sheet.addCondition('contentMiddle').addProp({ contentVertical: 'middle' });
    sheet.addCondition('contentBottom').addProp({ contentVertical: 'bottom' });

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            display: 'flex',
            verticalAlign: 'bottom',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    figure.addSelector({
        common: {
            alignSelf: 'flex-start',
            width: 'getProp:figureWidth',
        },
    }).addSelector({
        condition: ['figureMiddle'],
        common: {
            alignSelf: 'flex-center',
        },
    }).addSelector({
        condition: ['figureBottom'],
        common: {
            alignSelf: 'flex-end',
        },
    });

    content.addSelector({
        common: {
            alignSelf: 'flex-start',
        },
    }).addSelector({
        condition: ['contentMiddle'],
        common: {
            alignSelf: 'flex-center',
        },
    }).addSelector({
        condition: ['contentBottom'],
        common: {
            alignSelf: 'flex-end',
        },
    });

    return sheet;
};
