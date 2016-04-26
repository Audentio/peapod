import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
    main = sheet.addMain(),
    outer = sheet.addPart('outer'),
    inner = sheet.addPart('inner');

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

outer.addSelector({
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
