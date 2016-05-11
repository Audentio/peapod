import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('Tooltip'),
    main = sheet.addMain(),
    tooltip = sheet.addPart('tooltip'),
    arrow = sheet.addPart('arrow'),
    text = sheet.addPart('text');

// Conditions
sheet.addCondition('positionLeft').addStyler({position: 'left'});
sheet.addCondition('positionRight').addStyler({position: 'right'});
sheet.addCondition('positionTop').addStyler({position: 'top'});
sheet.addCondition('positionBottom').addStyler({position: 'bottom'});


//Variables
sheet.setValues({});

main.addSelector({
    common: {
        // position: 'relative',
        // display: 'inline'
    }
});

tooltip.addSelector({
    common: {
        padding: '5px 10px',
        background: 'rgba(0,0,0,.5)',
        position: 'absolute',
        color:'#fff',
        whiteSpace: 'nowrap',
        borderRadius: '3px',

        left: '100%',
        top: '50%',
        marginLeft: '5px',
        transform: 'translateY(-50%)'
    }
}).addSelector({
    condition: ['positionLeft'],
    common: {
        left: 'auto', right: '100%',
        marginLeft: 0, marginRight: '5px',
        transform: 'translateY(-50%)'
    }
}).addSelector({
    condition: ['positionTop'],
    common: {
        left: '50%',
        top: 'auto',
        bottom: '100%',
        marginLeft: 0,
        marginBottom: '5px',
        transform: 'translateX(-50%)'
    }
}).addSelector({
    condition: ['positionBottom'],
    common: {
        left: '50%',
        top: '100%',
        marginLeft: 0,
        marginTop: '5px',
        transform: 'translateX(-50%)'
    }
});

arrow.addSelector({
    common: {}
});

text.addSelector({
    common: {}
})


module.exports = sheet;
