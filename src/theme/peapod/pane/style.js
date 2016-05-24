import { Sheet } from 'utility/stylesheet.js';

module.exports = function style(sheetName) {
    let sheet = new Sheet(sheetName);
    const main = sheet.addMain();

  // Conditions

  // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            display: 'block',
            width: '100%',
        },
    });

    return sheet;
};
