import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const button = sheet.addPart('button');
    const icon = sheet.addPart('icon');

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            width: '250px',
            height: '50px',
            lineHeight: '50px',
            marginTop: '$gutter.extrasmall',
            background: '#fff',
            textAlign: 'center',
            overflow: 'hidden',
            color: '$palette.grey800',
            display: 'block',
            float: 'left',
        },
    });

    button.addSelector({
        common: {
            width: '58px',
            height: '50px',
            lineHeight: '50px',
            marginTop: '$gutter.extrasmall',
            background: 'white',
            textAlign: 'center',
            overflow: 'hidden',
            color: '$palette.grey600',
            display: 'block',
            float: 'left',
            textDecoration: 'none',
            position: 'relative',
        },
    });

    icon.addSelector({
        common: {
            fontSize: '2em',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
        },
    });

    return sheet;
};
