import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
    main = sheet.addMain();

//Conditions

//Variables

main.addSelector({
    common: {
        backgroundColor: 'rgba(0,0,0,.4)',
        position: 'fixed',
        top: 0, right: 0,
        bottom: 0, left:0
    }
})

module.exports = sheet;
