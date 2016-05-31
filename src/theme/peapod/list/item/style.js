import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const imageContainer = sheet.addPart('imageContainer');
    const image = sheet.addPart('image');
    const icon = sheet.addPart('icon');
    const secondary = sheet.addPart('secondary');

    // Conditions
    sheet.addCondition('secondary').addFunction((instance) => instance.props.secondary !== undefined || instance.styler.imgSize === 'large');

    sheet.addCondition('imageSmall').addStyler({ imgSize: 'small' });
    sheet.addCondition('imageMedium').addStyler({ imgSize: 'medium' });
    sheet.addCondition('imageLarge').addStyler({ imgSize: 'large' });

    sheet.addCondition('imageLeft').addStyler({ image: 'left' });
    sheet.addCondition('imageRight').addStyler({ image: 'right' });
    sheet.addCondition('iconLeft').addStyler({ icon: 'left' });
    sheet.addCondition('iconRight').addStyler({ icon: 'right' });

    // Functions
    const half = (value1) => parseFloat(Pod_Vars.get(value1)) / 2;
    const minus = (value1, value2) => parseFloat(Pod_Vars.get(value1)) - parseFloat(Pod_Vars.get(value2));

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
