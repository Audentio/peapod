module.exports = function (sheet) {
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

        sheet.selector('.main', {
            background: component.background,
            boxShadow: component.boxShadow,
            paddingTop: component.paddingTop,
            paddingBottom: component.paddingBottom,
            borderRadius: component.borderRadius,
            zIndex: component.zIndex,
            position: 'absolute',
        }).selector('.main.--text', {
            background: 'transparent',
            boxShadow: 'none',
            position: 'static',
            paddingTop: '0',
            paddingBottom: '0',
        }).selector('.main.--level', {
            whiteSpace: 'nowrap',
            transform: 'translate(0, -' + add(theme.gutter.large, component.paddingTop) + 'px)',
            left: '100%',
        }).selector('.main.--left', {
            left: 'auto',
            right: '100%',
        });

        sheet.selector('.container', {
            display: 'inline-block',
        });

        sheet.selector('.portal', {
            background: component.background,
            boxShadow: component.boxShadow,
            paddingTop: component.paddingTop,
            paddingBottom: component.paddingBottom,
            borderRadius: component.borderRadius,
            zIndex: component.zIndex,
            position: 'relative',
        });

        sheet.selector('.trigger', {
            display: 'inline-block',
            zIndex: component.zIndex,
            position: 'relative',
        }).selector('.trigger.--level', {
            display: 'block',
        });
    };

    return sheet;
};
