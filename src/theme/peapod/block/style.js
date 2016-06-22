import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Conditions
    sheet.addCondition('alignRight').addProp({ align: 'right' });
    sheet.addCondition('alignLeft').addProp({ align: 'left' });
    sheet.addCondition('alignCenter').addProp({ align: 'center' });
    sheet.addCondition('padded').addProp({ padded: ['!=', undefined] });

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            overflow: 'hidden',
        },
    }).addSelector({
        condition: ['padded'],
        common: {
            padding(obj) {
                return obj.props.padding || '$gutter.small';
            },
        },
    }).addSelector({
        condition: ['alignLeft'],
        common: {
            float: 'left',
            marginRight: '$gutter.small',
        },
    }).addSelector({
        condition: ['alignRight'],
        common: {
            float: 'right',
            marginLeft: '$gutter.small',
        },
    }).addSelector({
        condition: ['alignCenter'],
        common: {
            textAlign: 'center',
        },
    });

    return sheet;
};
