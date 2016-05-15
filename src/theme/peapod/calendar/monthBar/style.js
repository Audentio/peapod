import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
    var sheet = new Sheet(sheetName);
    var main = sheet.addMain();
    var button = sheet.addPart('button');

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            width: '250px',
            height: '50px',
            lineHeight: '50px',
            background:'#fff',
            textAlign: 'center',
            overflow: 'hidden',
            color: '#c78626',
            display: 'block',
            float:'left',
        },
    });

    button.addSelector({
        common: {
            width: '50px',
            height: '50px',
            lineHeight: '50px',
            background:'#fff',
            textAlign: 'center',
            overflow: 'hidden',
            color: '#c78626',
            display: 'block',
            float:'left',
            textDecoration: 'none',
        },
    });

    return sheet;
};
