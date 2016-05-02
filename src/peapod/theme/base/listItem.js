import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
    main = sheet.addMain(),
    rightImageContainer = sheet.addPart('rightImageContainer'),
    rightImage = sheet.addPart('rightImage'),
    leftIcon = sheet.addPart('leftIcon'),
    secondary = sheet.addPart('secondary');

//Conditions
// sheet.addCondition('secondary').addProps({secondary: ['!=', undefined]});
sheet.addCondition('secondary').addFunction((instance) => {
    if (instance.props.secondary != undefined || instance.styler.imgSize == 'large') return true;
});
sheet.addCondition('imageSmall').addStyler({imgSize: 'small'});
sheet.addCondition('imageMedium').addStyler({imgSize: 'medium'});
sheet.addCondition('imageLarge').addStyler({imgSize: 'large'});


//Variables
sheet.setValues({});

main.addSelector({
    common: {
        height: '48px',
        lineHeight: '1',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '16px',
        paddingBottom: '16px',

        fontSize: '$font.size.subheading'
    }
}).addSelector({
    condition: ['secondary'],
    common: {
        height: '72px',
        lineHeight: 'auto'
    }
})

rightImageContainer.addSelector({
    common: {
        width: '56px',
        float: 'left'
    }
})

rightImage.addSelector({
    common: {
        height: '42px',
        width: '42px',
        borderRadius: '20px'
    }
}).addSelector({
    condition: ['imageSmall'],
    common: {
        height: '24px',
        width: '24px',
        borderRadius: '12px'
    }
}).addSelector({
    condition: ['imageLarge'],
    common: {
        height: '42px',
        width: '42px',
        borderRadius: '160px'
    }
})

leftIcon.addSelector({
    common: {
        float: 'right'
    }
})

secondary.addSelector({
    common: {
        display: 'block',
        fontSize: '$font.size.body1'
    }
})

module.exports = sheet;