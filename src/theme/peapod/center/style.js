import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const outer = sheet.addPart('outer');
    const inner = sheet.addPart('inner');

    main.addSelector({
        common: {
            display: 'table',
            width: '100%',
            height: '100%',
        },
    });

    outer.addSelector({
        common: {
            display: 'table-cell',
            verticalAlign: 'getProp:valign',
            textAlign: 'getProp:align',
        },
    });

    inner.addSelector({
        common: {
            textAlign: 'left',
            display: 'inline-block',
        },
    });

    return sheet;
};
