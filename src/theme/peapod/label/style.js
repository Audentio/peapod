import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    // const icon = sheet.addPart('icon');

    // Variables
    sheet.setValues({
        color: {
            text: '$color.text.white',
        },
    });

    sheet.addCondition('round').addStyler({ round: true });

    main.addSelector({
        common: {
            color: '$label.color.text',
            backgroundColor: '$color.general.base',
            display: 'inline-block',
            paddingTop: '$gutter.extrasmall',
            paddingBottom: '$gutter.extrasmall',
            paddingLeft: '$gutter.internal',
            paddingRight: '$gutter.internal',
        },
    }).addSelector({
        condition: ['round'],
        common: {
            borderRadius: '1000px',
        },
    });

    const choices = ['success', 'danger', 'info', 'warning', 'secondary', 'base'];
    for (let choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
        sheet.addCondition('kind_' + choices[choiceIndex]).addStyler({ kind: choices[choiceIndex] });
        main.addSelector({
            condition: ['kind_' + choices[choiceIndex]],
            common: {
                backgroundColor: '$color.' + choices[choiceIndex] + '.base',
            },
        });
    }

    return sheet;
};
