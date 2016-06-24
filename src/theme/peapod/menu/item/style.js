import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const anchor = sheet.addPart('anchor');
    const button = sheet.addPart('button');
    const subtext = sheet.addPart('subtext');

    // Conditions
    sheet.addCondition('horizontal').addProp({ orientation: 'horizontal' });
    sheet.addCondition('hovered').addProp({ hovered: true });
    sheet.addCondition('text').addProp({ textstyle: 'text' });

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            height: '$gutter.large',
            lineHeight: '$gutter.large',
            paddingLeft: '$gutter.small',
            paddingRight: '$gutter.small',
            background: '$palette.white',
            // width: '100%',
            position: 'relative',
            color: 'inherit',
            cursor: 'default',

            ':hover': {
                background: '$palette.grey100',
            },
        },
    }).addSelector({
        condition: ['hovered'],
        common: {
            background: '$palette.grey100',
        },
    }).addSelector({
        condition: ['text'],
        common: {
            background: 'transparent',
            paddingLeft: 0,
            paddingRight: 0,

            ':hover': {
                background: 'transparent',
            },
        },
    }).addSelector({
        condition: ['hovered', 'text'],
        common: {
            background: 'transparent',
            paddingLeft: 0,
            paddingRight: 0,
        },
    }).addSelector({
        condition: ['horizontal'],
        common: {
            display: 'inline-block',
            paddingLeft: 0,
            paddingRight: 0,
        },
    });

    subtext.addSelector({
        common: {
            display: 'inline-block',
            textAlign: 'right',
            paddingLeft: '$gutter.small',
            alignSelf: 'flex-end',
        },
    });

    anchor.addSelector({
        common: {
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            ':hover': {
                color: 'inherit',
            },
        },
    });

    button.addSelector({
        common: {},
    });

    return sheet;
};
