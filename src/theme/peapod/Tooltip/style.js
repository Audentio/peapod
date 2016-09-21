module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('positionTop', (instance) =>
        instance.styler.hasOwnProperty('position') && /^top/.exec(instance.styler.position)
    );
    sheet.addCondition('positionTopRight').addStyler({ position: 'top-right' });
    sheet.addCondition('positionTopLeft').addStyler({ position: 'top-left' });

    sheet.addCondition('positionRight').addStyler({ position: undefined });

    sheet.addCondition('positionBottom', (instance) =>
        instance.styler.hasOwnProperty('position') && /^bottom/.exec(instance.styler.position)
    );
    sheet.addCondition('positionBottomRight').addStyler({ position: 'bottom-right' });
    sheet.addCondition('positionBottomLeft').addStyler({ position: 'bottom-left' });

    sheet.addCondition('positionLeft', (instance) =>
        instance.styler.hasOwnProperty('position') && /^left/.exec(instance.styler.position)
    );

    sheet.addCondition('mobile').addStyler({ mobile: true });


    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            background: theme.palette.grey700,
            color: '#fff',
            height: '22px',
            borderRadius: theme.border.radius.small,
            opacity: '90%',
            padding: theme.gutter.extrasmall,
            fontSize: '10px',
            margin: theme.gutter.extrasmall,

            mobile: {
                padding: theme.gutter.small,
                height: '32px',
                fontSize: '14px',
            },
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {});

        sheet.selector('.tooltip', {
            paddingLeft: component.padding,
            paddingRight: component.padding,
            height: component.height,
            lineHeight: component.height,
            fontSize: component.fontSize,
            background: theme.palette.grey700,
            color: component.color,
            borderRadius: component.borderRadius,
            opacity: component.opacity,
            position: 'absolute',
            whiteSpace: 'nowrap',
        }).selector('.tooltip.--mobile', {
            paddingLeft: component.mobile.padding,
            paddingRight: component.mobile.padding,
            height: component.mobile.height,
            lineHeight: component.mobile.height,
            fontSize: component.mobile.fontSize,
        }).selector('.tooltip.--positionTop', {
            left: '50%',
            top: 'auto',
            bottom: '100%',
            marginLeft: 0,
            marginBottom: component.margin,
            transform: 'translateX(-50%)',
        }).selector('.tooltip.--positionTopRight', {
            right: '0',
            left: 'auto',
            transform: 'none',
        }).selector('.tooltip.--positionTopLeft', {
            right: 'auto',
            left: '0',
            transform: 'none',
        }).selector('.tooltip.--positionRight', {
            left: '100%',
            top: '50%',
            marginLeft: component.margin,
            transform: 'translateY(-50%)',
        }).selector('.tooltip.--positionBottom', {
            left: '50%',
            top: '100%',
            marginLeft: 0,
            marginTop: component.margin,
            transform: 'translateX(-50%)',
        }).selector('.tooltip.--positionBottomRight', {
            right: '0',
            left: 'auto',
            transform: 'none',
        }).selector('.tooltip.--positionBottomLeft', {
            right: 'auto',
            left: '0',
            transform: 'none',
        }).selector('.tooltip.--positionLeft', {
            left: 'auto',
            right: '100%',
            top: '50%',
            marginLeft: 0,
            marginRight: component.margin,
            transform: 'translateY(-50%)',
        });

        sheet.selector('.arrow', {});
    };

    return sheet;
};
