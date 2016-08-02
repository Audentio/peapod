module.exports = function (sheet) {
    const main = sheet.addMain();
    const portal = sheet.addPart('portal');
    const trigger = sheet.addPart('trigger');
    const container = sheet.addPart('container');

    sheet.addCondition('level').addStyler({ level: 1 });
    sheet.addCondition('left').addStyler({ left: true });
    sheet.addCondition('text').addProp({ style: ['!=', undefined] });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            background: theme.palette.white,
            boxShadow: theme.shadows.d1,
            paddingTop: theme.gutter.internal,
            paddingBottom: theme.gutter.internal,
            borderRadius: theme.border.radius.small,
            zIndex: theme.zIndex.level6,
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        const add = (valueone, valuetwo) => (parseFloat(valueone) + parseFloat(valuetwo));

        container.addSelector({
            common: {
                display: 'inline-block',
            },
        });

        main.addSelector({
            common: {
                background: component.background,
                boxShadow: component.boxShadow,
                paddingTop: component.paddingTop,
                paddingBottom: component.paddingBottom,
                borderRadius: component.borderRadius,
                zIndex: component.zIndex,
                position: 'absolute',
            },
        }).addSelector({
            condition: ['text'],
            common: {
                background: 'transparent',
                boxShadow: 'none',
                position: 'static',
                paddingTop: '0',
                paddingBottom: '0',
            },
        }).addSelector({
            condition: ['level'],
            common: {
                whiteSpace: 'nowrap',
                transform: 'translate(0, -' + add(theme.gutter.large, theme.menu.paddingTop) + 'px)',
                left: '100%',
            },
        }).addSelector({
            condition: ['left'],
            common: {
                left: 'auto',
                right: '100%',
            },
        });

        portal.addSelector({
            common: {
                background: component.background,
                boxShadow: component.boxShadow,
                paddingTop: component.paddingTop,
                paddingBottom: component.paddingBottom,
                borderRadius: component.borderRadius,
                zIndex: component.zIndex,
                position: 'relative',
            },
        });

        trigger.addSelector({
            common: {
                display: 'inline-block',
                zIndex: component.zIndex,
                position: 'relative',
            },
        }).addSelector({
            condition: ['level'],
            common: {
                display: 'block',
            },
        });
    };

    return sheet;
};
