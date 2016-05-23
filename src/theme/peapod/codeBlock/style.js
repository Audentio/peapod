import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const label = sheet.addPart('label');
    const code = sheet.addPart('code');

    main.addSelector({
        common: {
            display: 'block',
            marginBottom: '$gutter.internal',
            fontFamily: '$font.family.code',
            fontSize: '$font.size.small',
            border: 0,
        },
    });

    code.addSelector({
        common: {
            padding: '$gutter.internal',
        },
    });

    label.addSelector({
        common: {
            display: 'inline-block',
            borderBottom: '2px solid $color.general.base',
            padding: '0 10px 5px 1px',
            textTransform: 'uppercase',
            fontFamily: '$font.family.primary',
            fontSize: '.9em',
            fontWeight: '$font.weight.bold',
        },
    });

    return sheet;
};
