module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('hovered').addState({ hovered: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            height: '32px',
            background: theme.palette.grey100,
            color: 'rgba(0,0,0,.67)',
            hover: {
                background: theme.palette.grey600,
                color: theme.palette.white,
            },
            paddingLeftRight: '12px',
            innerMargins: '8px',
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        const half = (value) => (parseFloat(value) / 2);

        sheet.selector('.main', {
            backgroundColor: component.background,
            display: 'inline-block',
            height: component.height,
            lineHeight: component.height,
            paddingLeft: component.paddingLeftRight,
            paddingRight: component.paddingLeftRight,
            color: component.color,
            borderRadius: '1000px',

            ':hover': {
                background: component.hover.background,
                color: component.hover.color,
            },
        });

        sheet.selector('.deleteTrigger', {
            display: 'inline-block',
            height: half(component.height),
            lineHeight: half(component.height) + 'px',
            width: half(component.height),
            fontSize: theme.font.size.xxsmall,
            background: theme.palette.grey500,
            color: component.background,
            textAlign: 'center',
            float: 'right',
            marginLeft: component.innerMargins,
            marginRight: (0 - half(component.innerMargins)) + 'px',
            marginTop: component.innerMargins,
            borderRadius: half(component.height) + 'px',
            cursor: 'pointer',

            ':hover': {
                background: component.hover.color,
                color: component.hover.background,
            },
        });

        sheet.selector('.photo', {
            height: component.height,
            width: component.height,
            borderRadius: half(component.height) + 'px',
            float: 'left',
            marginLeft: (0 - parseFloat(component.paddingLeftRight)) + 'px',
            marginRight: component.innerMargins,
        });
    };

    return sheet;
};
