import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('center'),
    main = sheet.addMain(),
    outer = sheet.addPart('outer'),
    inner = sheet.addPart('inner');

//Conditions

//Variables

main.addSelector({
    common: {
        display: 'table',
        width: '100%',
        height: '100%'
    }
})

inner.addSelector({
    common: {
        display: 'table-cell',
        verticalAlign: 'middle',
        textAlign: 'center'
    }
})

module.exports = sheet;
