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
        height: '$gutter.large',
        lineHeight: '$gutter.large',
        paddingLeft: '$gutter.small',
        paddingRight: '$gutter.small',
        background: '$palette.white',
        width: '100%',
        position: 'relative',

        ':hover': {
            background: '$palette.grey100'
        }
    }
});

subtext.addSelector({
    common: {
        position: 'absolute',
        top: 0, right: '$gutter.small',
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
