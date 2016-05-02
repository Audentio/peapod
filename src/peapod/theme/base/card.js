import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
    main = sheet.addMain(),
    actionBar = sheet.addPart('actionBar'),
    title = sheet.addPart('title'),
    content = sheet.addPart('content');

//Conditions
sheet.addCondition('disguised').addStyler({disguised: true});
sheet.addCondition('padded').addStyler({padded: true});

//Variables
sheet.setValues({});

main.addSelector({
    common: {
        backgroundColor: '$palette.white',
        borderRadius: '$border.radius.small',
        boxShadow: '$shadows.d1',
        margin: '8px',
        overflow: 'hidden',
        display: 'inline-block',
        textAlign: 'left',
        verticalAlign: 'top'
    }
}).addSelector({
    condition: ['disguised'],
    common: {
        backgroundColor: 'transparent',
        boxShadow: 'none'
    }
})
// .addSelector({
//     condition: ['padded'],
//     common: {
//         padding: '16px'
//     }
// })

title.addSelector({
    common: {
        paddingTop: '16px',
        paddingLeft: '16px',
        paddingRight: '16px'
    }
});

content.addSelector({
    condition: ['padded'],
    common: {
        paddingLeft: '16px',
        paddingRight: '16px'
    }
});

actionBar.addSelector({
    common: {
        padding: 8
    }
});

module.exports = sheet;