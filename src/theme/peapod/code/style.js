import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    sheet.addCondition('noHighLight').addProp({ noHighLight: true });

    main.addSelector({
        common: {
            backgroundColor: '$palette.blue50',
            color: '$palette.blue700',
            padding: '1px 2px',
            fontSize: '85%',
            fontFamily: '$font.family.code',
        },
    }).addSelector({
        condition: 'noHighLight',
        common: {
            backgroundColor: 'transparent',
            padding: '1px 0',
            color: '$palette.grey800',
        },
    });

    return sheet;
};
