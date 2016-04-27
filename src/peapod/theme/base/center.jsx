import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
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
