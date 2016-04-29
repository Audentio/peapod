import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
    main = sheet.addMain();

//Conditions
sheet.addCondition('disguised').addStyler({disguised: true});

//Variables
sheet.setValues({});

main.addSelector({
    common: {
        backgroundColor: '$palette.white',
        borderRadius: '$border.radius.small',
        boxShadow: '$shadows.d1',
        margin: '8px',
        overflow: 'hidden',
        display: 'inline-block',
        textAlign: 'left'
    }
}).addSelector({
    condition: ['disguised'],
    common: {
        backgroundColor: 'transparent',
        boxShadow: 'none'
    }
})

module.exports = sheet;