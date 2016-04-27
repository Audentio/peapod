import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
    main = sheet.addMain(),
    anchor = sheet.addPart('anchor');

//Variables
sheet.setValues({
    common: {}
});

main.addSelector({
    common: {
        height: '32px',
        lineHeight: '32px',
        padding: '0 24px',
        background: '$palette.white',

        ':hover': {
            background: '$palette.grey100',
            color: 'blue'
        }
    }
});

anchor.addSelector({
    common: {
        textDecoration: 'none',
        color: 'inherit'
    }
});

module.exports = sheet;
