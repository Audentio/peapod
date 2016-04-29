import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
    main = sheet.addMain();

//Conditions
sheet.addCondition('titleLarge').addStyler({kind: 'title-large'});
sheet.addCondition('titleSmall').addStyler({kind: 'title-small'});
sheet.addCondition('titleWithSupports').addStyler({kind: 'title-supports'});
sheet.addCondition('actionBar').addStyler({kind: 'action-bar'});
sheet.addCondition('supportingText').addStyler({kind: 'supporting-text'});

sheet.addCondition('right').addStyler({align: 'right'});
sheet.addCondition('left').addStyler({align: 'left'});

//Variables
sheet.setValues({});

main.addSelector({
    common: {
        paddingTop: '16px',
        paddingRight: '16px',
        paddingBottom: '16px',
        paddingLeft: '16px',
        textAlgin: 'left'
    }
}).addSelector({
    condition: ['titleLarge'],
    common: {
        paddingTop: '24px',
        paddingBottom: '24px'
    }
}).addSelector({
    condition: ['titleWithSupports'],
    common: {
        paddingTop: '24px'
    }
}).addSelector({
    condition: ['actionBar'],
    common: {
        paddingTop: '8px',
        paddingRight: '8px',
        paddingBottom: '8px',
        paddingLeft: '8px'
    }
}).addSelector({
    condition: ['supportingText'],
    common: {
        paddingTop: '0px'
    }
}).addSelector({
    condition: ['right'],
    common: {
        textAlgin: 'right'
    }
});

module.exports = sheet;