import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('Droppable'),
    main = sheet.addMain();

//Conditions

//Variables
sheet.setValues({});

main.addSelector({
    common: {
        width:'100%',
        height: '300px',
        background: '#efefef',
        padding:'30px',
        fontSize: '3em'
    }
});

module.exports = sheet;