import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('Parallax'),
    main = sheet.addMain(),
    front = sheet.addPart('front'),
    back = sheet.addPart('back');

//Conditions
//Variables
sheet.setValues({
    height: '100vh',
    width: '100vw'
});

main.addSelector({
    common: {
        height: '$Parallax.height',
        width: '$Parallax.width',
        perspective: '1px',
        overflow: 'hidden',
        position: 'relative'
    }
});
front.addSelector({
    common: {
        height: 'calc( ' + Pod_Vars.get('Parallax.height') + ' * 2)',
        width: '$Parallax.width',
        position: 'absolute',
        top: 0, left: 0,
        transform: 'translateZ(0)',
    }
});
back.addSelector({
    common: {
        height: 'calc( ' + Pod_Vars.get('Parallax.height') + ' * 2)',
        width: '$Parallax.width',
        position: 'absolute',
        top: 0, left: 0,
        transform: 'translateZ(-2px) scale(3)'
    }
});

module.exports = sheet;
