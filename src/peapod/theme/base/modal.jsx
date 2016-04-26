import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
    main = sheet.addMain();

//Conditions

//Variables

main.addSelector({
    common: {
        borderWidth: '1px',
        backgroundColor: '$palette.white',
        padding: '10px',
        boxShadow: '0 1px 2px rgba(0,0,0,.2)',
        // margin: '{$gutter.internal} auto' //in case someone puts a width it will center
        display: 'inline-block',
        maxWidth: '400px'
    }
})


module.exports = sheet;
