import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('Calendar'),
    main = sheet.addMain(),
    dateBar = sheet.addPart('dateBar'),
    year = sheet.addPart('year'),
    date = sheet.addPart('date');

//Variables
sheet.setValues({});

main.addSelector({
    common: {
        width: '350px'
    }
})

dateBar.addSelector({
    common: {
        background: '$palette.blue400',
        color: '#fff',
        padding: '$gutter.small'
    }
})

date.addSelector({
    common: {
        fontSize: '$font.size.display1'
    }
})


module.exports = sheet;
