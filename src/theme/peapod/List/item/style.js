module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('secondary', instance => instance.props.secondary !== undefined || instance.styler.imgSize === 'large');

    sheet.addCondition('imageSmall').addStyler({ imgSize: 'small' });
    sheet.addCondition('imageMedium').addStyler({ imgSize: 'medium' });
    sheet.addCondition('imageLarge').addStyler({ imgSize: 'large' });
    sheet.addCondition('autoHeight').addStyler({ height: 'auto' });

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

        sheet.selector('.main', {
            height: component.height.small,
            lineHeight: '1',
            paddingLeft: component.padding.left,
            paddingRight: component.padding.right,
            paddingTop: component.padding.top,
            paddingBottom: component.padding.bottom,
            fontSize: theme.font.size.xsmall,
        }).selector('.main.--autoHeight', {
            height: 'auto',
        }).selector('.main.--secondary', {
            height: component.height.large,
            lineHeight: 'auto',
        });

        sheet.selector('.imageContainer', {
            width: minus(component.height.large, component.padding.left),
            float: 'left',
        }).selector('.imageContainer.--imageRight', {
            width: minus(component.height.large, component.padding.left),
            textAlign: 'right',
            float: 'right',
        }).selector('.imageContainer.--secondary', {
            height: '52px',
        });

        sheet.selector('.image', {
            height: component.image.large,
            width: component.image.large,
            borderRadius: half(component.image.large),
        }).selector('.image.--imageSmall', {
            height: component.image.small,
            width: component.image.small,
            borderRadius: half(component.image.small),
        });

        sheet.selector('.icon', {
            float: 'right',
            width: minus(component.height.large, component.padding.left),
            textAlign: 'right',
            marginTop: '16px',
            marginLeft: '16px',
            marginRight: '16px',
        }).selector('.icon.--iconLeft', {
            float: 'left',
            textAlign: 'left',
        }).selector('.icon.--secondary', {
            height: '36px',
        });

        sheet.selector('.secondary', {
            display: 'block',
            fontSize: theme.font.size.xsmall,
            marginTop: '0px', // Clears a height issue
        });
    };

    return sheet;
};
