import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
    main = sheet.addMain();

//Conditions
sheet.addCondition('alignRight').addProp({align: 'right'});
sheet.addCondition('alignLeft').addProp({align: 'left'});

//Variables
sheet.setValues({});

main.addSelector({
    common: {
        overflow: 'hidden'
    }
}).addSelector({
    condition: ['alignLeft'],
    common: {
        float: 'left',
        marginRight: '$gutter.small'
    }
}).addSelector({
    condition: ['alignRight'],
    common: {
        float: 'right',
        marginLeft: '$gutter.small'
    }
});
module.exports = sheet;
