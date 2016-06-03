import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const listitem = sheet.addPart('listitem');

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            height: '$gutter.extralarge',
            lineHeight: '$gutter.extralarge',
            background: 'white',
            paddingLeft: '$gutter.extrasmall',
            paddingRight: '$gutter.extrasmall',
            borderRadius: '$border.radius.small',
            color: '$palette.grey500',
        },
    });

    listitem.addSelector({
        common: {
            height: '$gutter.extralarge',
            display: 'inline-block',
            paddingLeft: '$gutter.extrasmall',
            paddingRight: '$gutter.extrasmall',
        },
    });

    return sheet;
};
