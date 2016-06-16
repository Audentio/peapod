import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Conditions
    sheet.addCondition('active').addProp({ active: true });
    sheet.addCondition('inactive').addProp({ active: false });

    main.addSelector({
        common: {
            display: 'inline-block',
            height: '48px',
            lineHeight: '48px',
            paddingRight: '$gutter.small',
            paddingLeft: '$gutter.small',
            color: '$color.base.hover',
            textDecoration: 'uppercase',
            marginRight: '1px',
            cursor: 'pointer',
        },
    }).addSelector({
        condition: ['active'],
        common: {
            color: '$color.primary.base',
            borderBottomWidth: '2px',
            borderStyle: 'solid',
            borderColor: '$color.primary.base',
        },
    });

    return sheet;
};
