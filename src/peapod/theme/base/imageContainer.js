import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
    main = sheet.addMain(),
    innerscreen = sheet.addPart('innerscreen');

//Conditions
sheet.addCondition('scrollable').addStyler({scrollable: true});


//Variables
sheet.setValues({});

main.addSelector({
    common: {
        // background
        background: 'url(iphone.svg)', // passed value
        width: '320px', // passed value
        height: '600px', // passed value
        position: 'relative',
        backgroundSize: '100% 100%'
    }
})

innerscreen.addSelector({
    common: {
        position: 'absolute',
        top: 71,  // passed value
        left: 31,  // passed value
        bottom: 71,  // passed value
        right: 31,  // passed value
        overflow: 'hidden',
        background: '#fff' // for testing
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