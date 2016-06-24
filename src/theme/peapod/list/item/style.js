module.exports = function (sheet) {
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

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
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
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        // Functions
        const half = (value1) => parseFloat(value1) / 2;
        const minus = (value1, value2) => parseFloat(value1) - parseFloat(value2);

        main.addSelector({
            common: {
                height: component.height.small,
                lineHeight: '1',
                paddingLeft: component.padding.left,
                paddingRight: component.padding.right,
                paddingTop: component.padding.top,
                paddingBottom: component.padding.bottom,
                fontSize: theme.font.size.small,
            },
        }).addSelector({
            condition: ['secondary'],
            common: {
                height: component.height.large,
                lineHeight: 'auto',
            },
        });

        imageContainer.addSelector({
            common: {
                width: minus(component.height.large, component.padding.left),
                float: 'left',
            },
        }).addSelector({
            condition: ['imageRight'],
            common: {
                width: minus(component.height.large, component.padding.left),
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
                height: component.image.large,
                width: component.image.large,
                borderRadius: half(component.image.large),
            },
        }).addSelector({
            condition: ['imageSmall'],
            common: {
                height: component.image.small,
                width: component.image.small,
                borderRadius: half(component.image.small),
            },
        });

        icon.addSelector({
            common: {
                float: 'right',
                width: minus(component.height.large, component.padding.left),
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
                fontSize: theme.font.size.xsmall,
                marginTop: '0px', // Clears a height issue
            },
        });
    };

    return sheet;
};
