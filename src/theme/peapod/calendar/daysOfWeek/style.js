import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            color: '$palette.grey500',
            width: '50px',
            height: '25px',
            lineHeight: '25px',
            float: 'left',
            background: '#fff',
            textAlign: 'center',
            overflow: 'hidden',
            // fontWeight: 'bold',
            display: 'block',
            borderRadius: '1000px',
        },
    });

    return sheet;
};
