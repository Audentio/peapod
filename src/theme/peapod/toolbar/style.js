import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    main.addSelector({
        common: {
            padding: '16px',
            borderBottom: '1px solid #ddd',
            background: '#fff',
        },
    });

    return sheet;
};
