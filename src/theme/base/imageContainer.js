import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
    main = sheet.addMain(),
    innerscreen = sheet.addPart('innerscreen');

//Conditions
sheet.addCondition('scrollable').addStyler({scrollable: true});
sheet.addCondition('iphone').addProp({preset: 'iphone'});


//Variables
sheet.setValues({});

main.addSelector({
    common: {
        position: 'relative',
        backgroundSize: '100% 100%'
    }
}).addSelector({
    condition: ['iphone'],
    common: {
        backgroundImage: 'url(iphone.svg)', // passed value
        width: '320px', // passed value
        height: '600px' // passed value
    }
})

innerscreen.addSelector({
    common: {
        position: 'absolute',
        top: 0,  // passed value
        left: 0,  // passed value
        bottom: 0,  // passed value
        right: 0,  // passed value
        overflow: 'hidden'
    }
}).addSelector({
    condition: ['iphone'],
    common: {
        top: 71,
        left: 31,
        bottom: 71,
        right: 31,
    }
}).addSelector({
    condition: ['scrollable'],
    common: {
        overflowX: 'hidden',
        overflowY: 'auto'
        // scrollable?
    }
})

module.exports = sheet;
