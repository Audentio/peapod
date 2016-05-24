import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    var sheet = new Sheet(sheetName),
    main = sheet.addMain(),
    imageContainer = sheet.addPart('imageContainer'),
    image = sheet.addPart('image'),
    icon = sheet.addPart('icon'),
    secondary = sheet.addPart('secondary');

    // Conditions
    sheet.addCondition('secondary').addFunction((instance) => {
        if (instance.props.secondary != undefined || instance.styler.imgSize == 'large') return true;
    });

    sheet.addCondition('imageSmall').addStyler({ imgSize: 'small' });
    sheet.addCondition('imageMedium').addStyler({ imgSize: 'medium' });
    sheet.addCondition('imageLarge').addStyler({ imgSize: 'large' });

    sheet.addCondition('imageLeft').addStyler({ image: 'left' });
    sheet.addCondition('imageRight').addStyler({ image: 'right' });
    sheet.addCondition('iconLeft').addStyler({ icon: 'left' });
    sheet.addCondition('iconRight').addStyler({ icon: 'right' });

    // Functions
    var half = (value1) => {
        return (parseFloat(Pod_Vars.get(value1)) / 2);
    };
    var minus = (value1, value2) => {
        return (parseFloat(Pod_Vars.get(value1)) - parseFloat(Pod_Vars.get(value2)));
    };

    // Variables
    sheet.setValues({
        height: {
            small: 48,
            large: 72,
        },
        padding: {
            left: 16,
            right: 16,
            top: 16,
            bottom: 16,
        },
        font: {
            subheading: '',
            body: '',
        },
        image: {
            small: 24,
            large: 42,
        },
    });

    main.addSelector({
        common: {
            height: '$list_item.height.small',
            lineHeight: '1',
            paddingLeft: '$list_item.padding.left',
            paddingRight: '$list_item.padding.right',
            paddingTop: '$list_item.padding.top',
            paddingBottom: '$list_item.padding.bottom',

            fontSize: '$font.size.subheading',
        },
    }).addSelector({
        condition: ['secondary'],
        common: {
            height: '$list_item.height.large',
            lineHeight: 'auto',
        },
    });

    imageContainer.addSelector({
        common: {
            width: minus('list_item.height.large', 'list_item.padding.left'),
            float: 'left',
        },
    }).addSelector({
        condition: ['imageRight'],
        common: {
            width: minus('list_item.height.large', 'list_item.padding.left'),
            textAlign: 'right',
            float: 'right',
        },
    }).addSelector({
        condition: ['secondary'],
        common: {
            height: '52px',
        },
    });

    image.addSelector({
        common: {
            height: '$list_item.image.large',
            width: '$list_item.image.large',
            borderRadius: half('list_item.image.large'),
        },
    }).addSelector({
        condition: ['imageSmall'],
        common: {
            height: '$list_item.image.small',
            width: '$list_item.image.small',
            borderRadius: half('list_item.image.small'),
        },
    });

    icon.addSelector({
        common: {
            float: 'right',
            width: minus('list_item.height.large', 'list_item.padding.left'),
            textAlign: 'right',
            marginTop: '16px',
            marginLeft: '16px',
            marginRight: '16px',
        },
    }).addSelector({
        condition: ['iconLeft'],
        common: {
            float: 'left',
            textAlign: 'left',
        },
    }).addSelector({
        condition: ['secondary'],
        common: {
            height: '36px',
        },
    });

    secondary.addSelector({
        common: {
            display: 'block',
            fontSize: '$font.size.body1',
            marginTop: '0px', // Clears a height issue
        },
    });

    return sheet;
};
