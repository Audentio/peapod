import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
    main = sheet.addMain(),
    anchor = sheet.addPart('anchor'),
    subtext = sheet.addPart('subtext');

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

subtext.addSelector({
    common: {
        float: 'right',
        paddingLeft: '24px'
    }
});

anchor.addSelector({
    common: {
        textDecoration: 'none',
        color: 'inherit',
        display: 'inline-block',
        width: '100%',
        height: '100%'
    }
});

module.exports = sheet;
