import {Sheet} from 'stylesheet.js';

var sheet = new Sheet('list_item'),
    main = sheet.addMain(),
    imageContainer = sheet.addPart('imageContainer'),
    image = sheet.addPart('image'),
    icon = sheet.addPart('icon'),
    secondary = sheet.addPart('secondary');

//Conditions
sheet.addCondition('secondary').addFunction((instance) => {
    if (instance.props.secondary != undefined || instance.styler.imgSize == 'large') return true;
});

sheet.addCondition('imageSmall').addStyler({imgSize: 'small'});
sheet.addCondition('imageMedium').addStyler({imgSize: 'medium'});
sheet.addCondition('imageLarge').addStyler({imgSize: 'large'});

sheet.addCondition('imageLeft').addStyler({image: 'left'});
sheet.addCondition('imageRight').addStyler({image: 'right'});
sheet.addCondition('iconLeft').addStyler({icon: 'left'});
sheet.addCondition('iconRight').addStyler({icon: 'right'});

//Functions
var half = (value1) => {
    return (parseFloat(Pod_Vars.get(value1)) / 2);
}
var minus = (value1, value2) => {
    return (parseFloat(Pod_Vars.get(value1)) - parseFloat(Pod_Vars.get(value2)));
}

//Variables
sheet.setValues({
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

imageContainer.addSelector({
    common: {
        width: minus('listItem.height.large', 'listItem.padding.left'),
        float: 'left'
    }
}).addSelector({
    condition: ['imageRight'],
    common: {
        width: minus('listItem.height.large', 'listItem.padding.left'),
        textAlign: 'right',
        float: 'right'
    }
}).addSelector({
    condition: ['secondary'],
    common: {
        height: '52px'
    }
});

image.addSelector({
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

icon.addSelector({
    common: {
        float: 'right',
        width: minus('listItem.height.large', 'listItem.padding.left'),
        textAlign: 'right',
        marginTop: '16px',
        marginLeft: '16px',
        marginRight: '16px'
    }
}).addSelector({
    condition: ['iconLeft'],
    common: {
        float: 'left',
        textAlign: 'left'
    }
}).addSelector({
    condition: ['secondary'],
    common: {
        height: '36px'
    }
});

secondary.addSelector({
    common: {
        display: 'block',
        fontSize: '$font.size.body1',
        marginTop: '0px' // Clears a height issue
    }
})

module.exports = sheet;
