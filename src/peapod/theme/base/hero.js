import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
    main = sheet.addMain();

//Conditions
//Variables

main.addSelector({
    common: {
        display: 'block',
        width: '100vw',
        height: '100vh',
        backgroundPosition: 'center center'
    }
});

module.exports = sheet;
