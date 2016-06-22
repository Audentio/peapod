module.exports = function (sheet) {
    const main = sheet.addMain();
    const deleteTrigger = sheet.addPart('deleteTrigger');
    const photo = sheet.addPart('photo');

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

        main.addSelector({
            common: {
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
            },
        });

<<<<<<< HEAD
    deleteTrigger.addSelector({
        common: {
            display: 'inline-block',
            height: half('chip.height'),
            lineHeight: half('chip.height') + 'px',
            width: half('chip.height'),
            fontSize: '$font.size.xxsmall',
            background: '$palette.grey500',
            color: '$chip.background',
            textAlign: 'center',
            float: 'right',
            marginLeft: '$chip.innerMargins',
            marginRight: (0 - half('chip.innerMargins')),
            marginTop: '$chip.innerMargins',
            borderRadius: half('chip.height'),
            cursor: 'pointer',
=======
        deleteTrigger.addSelector({
            common: {
                display: 'inline-block',
                height: half(component.height),
                lineHeight: half(component.height) + 'px',
                width: half(component.height),
                fontSize: theme.font.size.caption,
                background: theme.palette.grey500,
                color: component.background,
                textAlign: 'center',
                float: 'right',
                marginLeft: component.innerMargins,
                marginRight: (0 - half(component.innerMargins)),
                marginTop: component.innerMargins,
                borderRadius: half(component.height),
                cursor: 'pointer',
>>>>>>> Audentio/master

                ':hover': {
                    background: component.hover.color,
                    color: component.hover.background,
                },
            },
        }).addSelector({
            condition: ['hovered'],
            common: {
                background: component.hover.color,
                color: component.hover.background,
            },
        });

        photo.addSelector({
            common: {
                height: component.height,
                width: component.height,
                borderRadius: half(component.height),
                float: 'left',
                marginLeft: (0 - parseFloat(component.paddingLeftRight)),
                marginRight: component.innerMargins,
            },
        });
    };

    return sheet;
};
