import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
    main = sheet.addMain();

//Conditions

//Variables

main.addSelector({
    common: {
        padding: '16px',
        borderBottom: '1px solid #ddd',
        background: '#fff'
    }
});

module.exports = sheet;
