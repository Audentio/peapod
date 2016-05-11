import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('Parallax'),
    main = sheet.addMain(),
    front = sheet.addPart('front'),
    back = sheet.addPart('back');

//Conditions
//Variables
sheet.setValues({
    height: '50vh',
    width: '100vw'
});

main.addSelector({
    common: {
        height: '$Parallax.height',
        width: '$Parallax.width',
        overflow: 'hidden',
        position: 'relative',
        background:'red'
    }
});
front.addSelector({
    common: {
        height: 'calc( ' + Pod_Vars.get('Parallax.height') + ' * 2)',
        width: '$Parallax.width',
        position: 'absolute',
        top: 0, left: 0,
        willChange: 'transform'
    }
});
back.addSelector({
    common: {
        height: 'calc( ' + Pod_Vars.get('Parallax.height') + ' * 2)',
        width: '$Parallax.width',
        position: 'absolute',
        top: 0, left: 0,
        willChange: 'transform'
    }
});

module.exports = sheet;
