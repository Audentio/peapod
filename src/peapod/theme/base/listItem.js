import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
    main = sheet.addMain(),
    rightImageContainer = sheet.addPart('rightImageContainer'),
    rightImage = sheet.addPart('rightImage'),
    leftIcon = sheet.addPart('leftIcon'),
    secondary = sheet.addPart('secondary');

//Conditions
sheet.addCondition('secondary').addFunction((instance) => {
    if (instance.props.secondary != undefined || instance.styler.imgSize == 'large') return true;
});
sheet.addCondition('imageSmall').addStyler({imgSize: 'small'});
sheet.addCondition('imageMedium').addStyler({imgSize: 'medium'});
sheet.addCondition('imageLarge').addStyler({imgSize: 'large'});

//Functions
var half = (value1) => {
    return (parseFloat(Pod_Vars.get(value1)) / 2);
}
var minus = (value1, value2) => {
    return (parseFloat(Pod_Vars.get(value1)) - parseFloat(Pod_Vars.get(value2)));
}

//Variables
sheet.setValues({
    common: {
        listItem: {
            height: {
                small: 48,
                large: 72
            },
            padding: {
                left: 16,
                right: 16,
                top: 16,
                bottom: 16,
            },
            font: {
                subheading: '',
                body: ''
            },
            image: {
                small: 24,
                large: 42
            }
        }
    }
});

main.addSelector({
    common: {
        height: '$listItem.height.small',
        lineHeight: '1',
        paddingLeft: '$listItem.padding.left',
        paddingRight: '$listItem.padding.right',
        paddingTop: '$listItem.padding.top',
        paddingBottom: '$listItem.padding.bottom',

        fontSize: '$font.size.subheading'
    }
}).addSelector({
    condition: ['secondary'],
    common: {
        height: '$listItem.height.large',
        lineHeight: 'auto'
    }
})

rightImageContainer.addSelector({
    common: {
        width: minus('listItem.height.large', 'listItem.padding.left'),
        float: 'left'
    }
})

rightImage.addSelector({
    common: {
        height: '$listItem.image.large',
        width: '$listItem.image.large',
        borderRadius: half('listItem.image.large')
    }
}).addSelector({
    condition: ['imageSmall'],
    common: {
        height: '$listItem.image.small',
        width: '$listItem.image.small',
        borderRadius: half('listItem.image.small')
    }
});

leftIcon.addSelector({
    common: {
        float: 'right'
    }
})

secondary.addSelector({
    common: {
        display: 'block',
        fontSize: '$font.size.body1',
        marginTop: '0px' // Clears a height issue
    }
})

module.exports = sheet;