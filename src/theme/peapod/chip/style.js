import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const deleteTrigger = sheet.addPart('deleteTrigger');
    const photo = sheet.addPart('photo');

    // Conditions
    sheet.addCondition('hovered').addState({ hovered: true });

    // Functions
    const half = (value) => (parseFloat(Pod_Vars.get(value)) / 2);

    // Variables
    sheet.setValues({
        height: '32px',
        background: '$palette.grey100',
        color: 'rgba(0,0,0,.67)',
        hover: {
            background: '$palette.grey600',
            color: '$palette.white',
        },
        paddingLeftRight: '12px',
        innerMargins: '8px',
    });

    main.addSelector({
        common: {
            backgroundColor: '$chip.background',
            display: 'inline-block',
            height: '$chip.height',
            lineHeight: '$chip.height',
            paddingLeft: '$chip.paddingLeftRight',
            paddingRight: '$chip.paddingLeftRight',
            color: '$chip.color',
            borderRadius: '1000px',

            ':hover': {
                background: '$chip.hover.background',
                color: '$chip.hover.color',
            },
        },
    });

    deleteTrigger.addSelector({
        common: {
            display: 'inline-block',
            height: half('chip.height'),
            lineHeight: half('chip.height') + 'px',
            width: half('chip.height'),
            fontSize: '$font.size.caption',
            background: '$palette.grey500',
            color: '$chip.background',
            textAlign: 'center',
            float: 'right',
            marginLeft: '$chip.innerMargins',
            marginRight: (0 - half('chip.innerMargins')),
            marginTop: '$chip.innerMargins',
            borderRadius: half('chip.height'),
            cursor: 'pointer',

            ':hover': {
                background: '$chip.hover.color',
                color: '$chip.hover.background',
            },
        },
    }).addSelector({
        condition: ['hovered'],
        common: {
            background: '$chip.hover.color',
            color: '$chip.hover.background',
        },
    });

    photo.addSelector({
        common: {
            height: '$chip.height',
            width: '$chip.height',
            borderRadius: half('chip.height'),
            float: 'left',
            marginLeft: (0 - parseFloat(Pod_Vars.get('chip.paddingLeftRight'))),
            marginRight: '$chip.innerMargins',
        },
    });

    return sheet;
};
