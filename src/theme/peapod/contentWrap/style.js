import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Variables
    sheet.setValues({
        maxWidth: '$site.maxWidth',
        width: '$site.width',
        padding: '$gutter.large',
    });

    main.addSelector({
        common: {
            maxWidth: '$contentWrap.maxWidth',
            width: '$contentWrap.width',
            margin: '0 auto',
            paddingLeft: '$contentWrap.padding',
            paddingRight: '$contentWrap.padding',
        },
    });

    return sheet;
};
