import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('imageContainer'),
    main = sheet.addMain(),
    background = sheet.addPart('background'),
    innerscreen = sheet.addPart('innerscreen');

//Conditions
sheet.addCondition('scrollable').addStyler({scrollable: true});
sheet.addCondition('iphone').addProp({preset: 'iphone'});
sheet.addCondition('horizontal').addStyler({horizontal: true});


//Variables
sheet.setValues({});

main.addSelector({
    common: {
        position: 'relative',
        backgroundSize: '100% 100%',
        position: 'relative'
    }
}).addSelector({
    condition: ['iphone'],
    common: {
        width: '320px',
        height: '600px'
    }
}).addSelector({
    condition: ['iphone', 'horizontal'],
    common: {
        height: '320px',
        width: '600px'
    }
})

background.addSelector({
    common: {
        position: 'relative',
        backgroundSize: '100% 100%'
    }
}).addSelector({
    condition: ['iphone'],
    common: {
        backgroundImage: 'url(iphone.svg)',
        width: '320px',
        height: '600px',
        position: 'absolute',
        bottom: 'calc(50% - 300px)',
        left: 'calc(50% - 160px)'
    }
}).addSelector({
    condition: ['iphone', 'horizontal'],
    common: {
        backgroundImage: 'url(iphone.svg)',
        width: '320px',
        height: '600px',
        transform: 'rotate(-90deg)',
        transformOrigin: 'center'
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
    condition: ['iphone', 'horizontal'],
    common: {
        top: 31,
        left: 71,
        bottom: 31,
        right: 71,
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
