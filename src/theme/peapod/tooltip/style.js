import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const tooltip = sheet.addPart('tooltip');
    const arrow = sheet.addPart('arrow');
    // const text = sheet.addPart('text');

    // Conditions
    sheet.addCondition('positionTop').addFunction((instance) =>
        instance.styler.hasOwnProperty('position') && /^top/.exec(instance.styler.position)
    );
    sheet.addCondition('positionTopRight').addStyler({ position: 'top-right' });
    sheet.addCondition('positionTopLeft').addStyler({ position: 'top-left' });

    sheet.addCondition('positionRight').addStyler({ position: undefined });

    sheet.addCondition('positionBottom').addFunction((instance) =>
        instance.styler.hasOwnProperty('position') && /^bottom/.exec(instance.styler.position)
    );
    sheet.addCondition('positionBottomRight').addStyler({ position: 'bottom-right' });
    sheet.addCondition('positionBottomLeft').addStyler({ position: 'bottom-left' });

    sheet.addCondition('positionLeft').addFunction((instance) =>
        instance.styler.hasOwnProperty('position') && /^left/.exec(instance.styler.position)
    );


    sheet.addCondition('mobile').addStyler({ mobile: true });


    // Variables
    sheet.setValues({
        background: '$palette.grey700',
        color: '#fff',
        height: '22px',
        borderRadius: '$border.radius.small',
        opacity: '90%',
        padding: '$gutter.extrasmall',
        fontSize: '10px',
        margin: '$gutter.extrasmall',

        mobile: {
            padding: '$gutter.small',
            height: '32px',
            fontSize: '14px',
        },
    });

    main.addSelector({
        common: {
            // position: 'relative',
            // display: 'inline'
        },
    });

    tooltip.addSelector({
        common: {
            paddingLeft: '$tooltip.padding',
            paddingRight: '$tooltip.padding',
            height: '$tooltip.height',
            lineHeight: '$tooltip.height',
            fontSize: '$tooltip.fontSize',
            background: '$palette.grey700',
            color: '$tooltip.color',
            borderRadius: '$tooltip.borderRadius',
            opacity: '$tooltip.opacity',
            position: 'absolute',
            whiteSpace: 'nowrap',
        },
    }).addSelector({
        condition: ['mobile'],
        common: {
            paddingLeft: '$tooltip.mobile.padding',
            paddingRight: '$tooltip.mobile.padding',
            height: '$tooltip.mobile.height',
            lineHeight: '$tooltip.mobile.height',
            fontSize: '$tooltip.mobile.fontSize',
        },
    })
    // top
    .addSelector({
        condition: ['positionTop'],
        common: {
            left: '50%',
            top: 'auto',
            bottom: '100%',
            marginLeft: 0,
            marginBottom: '$tooltip.margin',
            transform: 'translateX(-50%)',
        },
    }).addSelector({
        condition: ['positionTopRight'],
        common: {
            right: '0',
            left: 'auto',
            transform: 'none',
        },
    }).addSelector({
        condition: ['positionTopLeft'],
        common: {
            right: 'auto',
            left: '0',
            transform: 'none',
        },
    })
    // right
    .addSelector({
        condition: ['positionRight'],
        common: {
            left: '100%',
            top: '50%',
            marginLeft: '$tooltip.margin',
            transform: 'translateY(-50%)',
        },
    })
    // bottom
    .addSelector({
        condition: ['positionBottom'],
        common: {
            left: '50%',
            top: '100%',
            marginLeft: 0,
            marginTop: '$tooltip.margin',
            transform: 'translateX(-50%)',
        },
    }).addSelector({
        condition: ['positionBottomRight'],
        common: {
            right: '0',
            left: 'auto',
            transform: 'none',
        },
    }).addSelector({
        condition: ['positionBottomLeft'],
        common: {
            right: 'auto',
            left: '0',
            transform: 'none',
        },
    })
    // left
    .addSelector({
        condition: ['positionLeft'],
        common: {
            left: 'auto',
            right: '100%',
            top: '50%',
            marginLeft: 0, marginRight: '$tooltip.margin',
            transform: 'translateY(-50%)',
        },
    });

    arrow.addSelector({
        common: {},
    });

    return sheet;
};
