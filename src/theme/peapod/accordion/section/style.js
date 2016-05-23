import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const title = sheet.addPart('title');
    const maintitle = sheet.addPart('maintitle');
    const subtitle = sheet.addPart('subtitle');
    const icon = sheet.addPart('icon');
    const content = sheet.addPart('content');
    const contentWrap = sheet.addPart('contentWrap');

    // Conditions
    sheet.addCondition('isFirst').addProp({ isFirst: true });
    sheet.addCondition('isLast').addProp({ isLast: true });
    sheet.addCondition('isActive').addProp({ active: true });
    sheet.addCondition('notActive').addProp({ active: false });

    sheet.addCondition('horizontal').addProp({ horizontal: true });
    sheet.addCondition('notHorizontal').addProp({ horizontal: undefined });
    sheet.addCondition('open').addState({ open: true });

    // Variables
    sheet.setValues({
        titleHeight: '42px',
        border: {
            width: '1px',
            color: '$palette.grey400',
        },
        background: {
            base: '#fff',
            hover: '$palette.grey200',
        },
    });

    main.addSelector({
        common: {
            width: '100%',
            marginTop: 0,
            marginBottom: 0,
            transition: 'margin .3s',
        },
    }).addSelector({
        condition: ['open'],
        common: {
            width: '100%',
            marginTop: '$gutter.internal',
            marginBottom: '$gutter.internal',
            transition: 'margin .3s',
        },
    }).addSelector({
        condition: ['open', 'isFirst'],
        common: {
            marginTop: '0',
            transition: 'margin .3s',
        },
    }).addSelector({
        condition: ['open', 'isLast'],
        common: {
            marginBottom: '0',
            transition: 'margin .3s',
        },
    }).addSelector({
        condition: ['horizontal'],
        common: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
        },
    });

    title.addSelector({
        common: {
            borderStyle: 'solid',
            zIndex: '100',
            position: 'relative',
            background: '$accordion_section.background.base',
            borderColor: '#ddd',
            borderWidth: '1px 0 0',
            paddingLeft: '$gutter.small',
            paddingRight: '$gutter.internal',
            height: '$accordion_section.titleHeight',
            lineHeight: '$accordion_section.titleHeight',
        },
    }).addSelector({
        condition: ['horizontal'],
        common: {
            borderBottomWidth: 1,
            borderRightWidth: 0,
        },
    }).addSelector({
        condition: ['horizontal', 'isLast', 'notActive'],
        common: {
            borderRightWidth: 1,
        },
    });
    maintitle.addSelector({
        common: {
            color: '$palette.grey900',
        },
    });
    subtitle.addSelector({
        common: {
            display: 'inline-block',
            paddingRight: '$gutter.internal',
            minWidth: '25%',
            color: '$palette.grey600',
        },
    });

    icon.addSelector({
        common: {
            fontSize: '2em',
            float: 'right',
            height: '$accordion_section.titleHeight',
            lineHeight: '$accordion_section.titleHeight',
            transition: 'transform .3s',
            color: '$palette.grey500',
        },
    }).addSelector({
        condition: ['open'],
        common: {
            transform: 'rotate(180deg)',
            transition: 'transform .3s',
        },
    });

    contentWrap.addSelector({
        common: {
            borderStyle: 'solid',
            borderColor: '#ddd',
            borderWidth: '0',
            width: '100%',
            overflow: 'hidden',
            transitionProperty: 'max-height, border-width',
            transitionDuration: '.3s, .3s',
        },
    }).addSelector({
        condition: ['isLast'],
        common: {
            borderBottomWidth: '1px',
        },
    }).addSelector({
        condition: ['open'],
        common: {
            borderTopWidth: '1px',
        },
    }).addSelector({
        condition: ['horizontal'],
        common: {
            borderBottomWidth: 1,
            borderRightWidth: 0,
            width: 'auto',
        },
    }).addSelector({
        condition: ['horizontal', 'isLast', 'isActive'],
        common: {
            borderRightWidth: 1,
        },
    }).addSelector({
        condition: ['notHorizontal'],
        common: {
            maxHeight: 0,
        },
    }).addSelector({
        condition: ['open', 'notHorizontal'],
        common: {
            maxHeight: '500px',
        },
    }).addSelector({
        condition: ['horizontal'],
        common: {
            maxWidth: 0,
        },
    }).addSelector({
        condition: ['open', 'horizontal'],
        common: {
            maxWidth: '500px',
        },
    });

    content.addSelector({
        common: {
            padding: '$gutter.small',
        },
    });

    return sheet;
};
