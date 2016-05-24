import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Conditions
    sheet.addCondition('notActive').addProp({ notActive: ['!=', undefined] });

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            float: 'left',
            width: '40px',
            height: '40px',
            margin: '5px',
            lineHeight: '40px',
            background: '#fff',
            textAlign: 'center',
            overflow: 'hidden',
            color: '$palette.grey900',
            display: 'block',
            borderRadius: '9999px',

            ':hover': {
                background: '$palette.teal500',
                color: 'white',
            },
        },
    }).addSelector({
        condition: ['notActive'],
        common: {
            color: '#fff',
        },
    });

    return sheet;
};
