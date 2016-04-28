import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
    main = sheet.addMain(),
    portal = sheet.addPart('portal'),
    trigger = sheet.addPart('trigger');

sheet.addCondition('level').addStyler({level: 1});
sheet.addCondition('left').addStyler({left: true});

//Variables
sheet.setValues({
    common: {}
});

main.addSelector({
    common: {
        background: '$palette.white',
        boxShadow: '$shadows.d1',
        paddingTop: '$gutter.internal',
        paddingBottom: '$gutter.internal',
        borderRadius: '$border.radius.small',
        zIndex: 3,
        position: 'absolute'
    }
}).addSelector({
    condition: ['level'],
    common: {
        whiteSpace: 'nowrap',
        transform: 'translate(0, -48px)',
        left: '100%'
    }
}).addSelector({
    condition: ['left'],
    common: {
        left: 'auto',
        right: '100%'
    }
});

portal.addSelector({
    common: {
        background: '#fff',
        boxShadow: '$shadows.d1',
        paddingTop: '$gutter.internal',
        paddingBottom: '$gutter.internal',
        borderRadius: '$border.radius.small',
        zIndex: 3,
        position: 'relative'
    }
});

trigger.addSelector({
    common: {
        display: 'inline-block'
    }
}).addSelector({
    condition: ['level'],
    common: {
        display: 'block'
    }
})

module.exports = sheet;
