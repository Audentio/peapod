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
sheet.setValues({
    common: {
        card: {
            padding: {
                large: '$gutter.internal',
                small: '$gutter.extrasmall'
            }
        }
    }
});

main.addSelector({
    common: {
        backgroundColor: '$palette.white',
        borderRadius: '$border.radius.small',
        boxShadow: '$shadows.d1',
        margin: '$card.padding.small',
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
        paddingTop: '$card.padding.large',
        paddingLeft: '$card.padding.large',
        paddingRight: '$card.padding.large'
    }
});

content.addSelector({
    condition: ['padded'],
    common: {
        paddingLeft: '$card.padding.large',
        paddingRight: '$card.padding.large'
    }
});

actionBar.addSelector({
    common: {
        padding: '$card.padding.small'
    }
});

module.exports = sheet;