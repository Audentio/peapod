module.exports = function (sheet) {
    sheet.addCondition('hover').addState({ isHovered: true });
    sheet.addCondition('isOpen').addState({ open: true });
    sheet.addCondition('notOpen').addState({ open: false });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            position: 'relative',
            display: 'inline-block',
            textAlign: 'left',
            textTransform: 'none',
            width: 180,
        });

        sheet.selector('.menu', {
            width: '100%',
            maxWidth: '100%',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            marginTop: 2,
        });

        sheet.selector('.option', {

        });

        sheet.selector('.trigger', {
            width: '100%',
            padding: '10px 15px',
            background: 'white',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px',
            borderBottomLeftRadius: 2,
            borderBottomRightRadius: 2,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            cursor: 'pointer',
            position: 'relative',
            zIndex: 10,
        }).selector('.trigger.--isOpen', {
            boxShadow: '$shadows.d1',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        }).selector('.trigger.--notOpen:hover', {
            boxShadow: 'rgba(0, 0, 0, 0.14) 0px 1px 2px',
        });

        sheet.selector('.triggerIcon', {
            color: '$palette.grey400',
            position: 'absolute',
            top: '50%',
            marginTop: -9,
            right: 5,
            fontSize: 18,
        }).selector('.triggerIcon.--hover', {
            color: '$palette.grey500',
        }).selector('.triggerIcon.--isOpen', {
            color: '$palette.grey600',
        });

        sheet.selector('.optionSelected', {
            backgroundColor: '$color.primary.base',
            color: 'white',
            ':hover': {
                backgroundColor: '$color.primary.base',
                color: 'white',
            },
        });
    };

    return sheet;
};
