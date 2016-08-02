import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);

    const main = sheet.addMain();
    const menu = sheet.addPart('menu');
    const option = sheet.addPart('option');
    const trigger = sheet.addPart('trigger');
    const triggerIcon = sheet.addPart('triggerIcon');
    const optionSelected = sheet.addPart('optionSelected');

    sheet.addCondition('hover').addState({ isHovered: true });
    sheet.addCondition('isOpen').addState({ open: true });
    sheet.addCondition('notOpen').addState({ open: false });

    main.addSelector({
        common: {
            position: 'relative',
            display: 'inline-block',
            textAlign: 'left',
            textTransform: 'none',
            width: 180,
        },
    });

    menu.addSelector({
        common: {
            width: '100%',
            maxWidth: '100%',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            marginTop: 2,
        },
    });

    option.addSelector({
        common: {},
    });

    trigger.addSelector({
        common: {
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
        },
    }).addSelector({
        condition: 'isOpen',
        common: {
            boxShadow: '$shadows.d1',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        },
    }).addSelector({
        condition: 'notOpen',
        common: {
            ':hover': {
                boxShadow: 'rgba(0, 0, 0, 0.14) 0px 1px 2px',
            },
        },
    });

    triggerIcon.addSelector({
        common: {
            color: '$palette.grey400',
            position: 'absolute',
            top: '50%',
            marginTop: -9,
            right: 5,
            fontSize: 18,
        },
    }).addSelector({
        condition: 'hover',
        common: {
            color: '$palette.grey500',
        },
    }).addSelector({
        condition: 'isOpen',
        common: {
            color: '$palette.grey600',
        },
    });

    optionSelected.addSelector({
        common: {
            backgroundColor: '$color.primary.base',
            color: 'white',
            ':hover': {
                backgroundColor: '$color.primary.base',
                color: 'white',
            },
        },
    });

    return sheet;
};
