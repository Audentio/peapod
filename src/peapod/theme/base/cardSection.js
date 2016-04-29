import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
    main = sheet.addMain();

//Conditions
sheet.addCondition('titleLarge').addStyler({kind: 'title-large'});
sheet.addCondition('titleSmall').addStyler({kind: 'title-small'});
sheet.addCondition('titleWithSupports').addStyler({kind: 'title-supports'});
sheet.addCondition('actionBar').addStyler({kind: 'action-bar'});
sheet.addCondition('supportingText').addStyler({kind: 'supporting-text'});
sheet.addCondition('media').addStyler({kind: 'media'});

sheet.addCondition('alignRight').addStyler({align: 'right'});
sheet.addCondition('floatRight').addStyler({float: 'right'});
sheet.addCondition('left').addStyler({align: 'left'});

//Variables
sheet.setValues({});

main.addSelector({
    common: {
        paddingTop: '16px',
        paddingRight: '16px',
        paddingBottom: '16px',
        paddingLeft: '16px',
        clear: 'both',
        overflow: 'hidden'
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
    condition: ['media'],
    common: {
        marginTop: '-8px',

        paddingTop: '0px',
        paddingRight: '0px',
        paddingBottom: '0px',
        paddingLeft: '0px'
    }
}).addSelector({
    condition: ['alignRight'],
    common: {
        textAlign: 'right'
    }
}).addSelector({
    condition: ['floatRight'],
    common: {
        float: 'right'
    }
});

module.exports = sheet;