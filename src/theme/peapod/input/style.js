import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const wrapper = sheet.addPart('wrapper');
    const input = sheet.addPart('input');
    const placeholder = sheet.addPart('placeholder');
    const charCounter = sheet.addPart('charCounter');

    sheet.addCondition('focused').addState({ focus: true });
    sheet.addCondition('type-textarea').addProp({ type: 'textarea' });
    sheet.addCondition('showCounter').addProp({ showCounter: true });

    // Variables
    sheet.setValues({
        color: {
            text: '$color.text.base',
            placeholder: 'rgba(0,0,0,0.3)',
            background: 'transparent',
            backgroundFocus: 'transparent',
            icon: '$input.color.text',
        },
        textIndent: 0,
        height: '36px',
        padding: {
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        },
        textareaPadding: {
            top: 10,
            right: 0,
            bottom: 10,
            left: 0,
        },
        border: {
            color: '$palette.blue400',
            radius: '0px',
            width: '0px 0px 2px',
            style: 'solid',
        },
        font: {
            family: 'inherit',
            size: '$font.size.large',
        },
    }).setValues({
        color: {
            background: 'transparent',
        },
        border: {
            width: '0px 0px 1px 0px',
        },
    }, 'material').setValues({
        color: {
            text: '$color.text.white',
            placeholder: '$input.color.text',
            background: 'transparent',
            backgroundFocus: 'rgba(255, 255, 255, 0.1)',
            icon: '$input.color.text',
        },
        border: {
            color: '$palette.grey200',
        },
    }, 'dark');

    wrapper.addSelector({
        common: {
            paddingBottom: '$gutter.extrasmall',
            paddingTop: '$gutter.internal',
        },
    });

    main.addSelector({
        common: {
            height: '$input.height',
            display: 'inline-block',
            fontSize: '$font.size.body1',
            // marginBottom: '$gutter.internal',
            position: 'relative',
            color: '$input.color.text',
            backgroundColor: '$input.color.background',
            borderWidth: '0px 0px 2px', // @kyler using a variable here breaks it
            borderStyle: '$input.border.style',
            borderColor: '$palette.grey300',
            borderRadius: '$input.border.radius',
            transition: 'border-color 100ms',
        },
    })
    .addSelector({
        condition: 'type-textarea',
        common: {
            display: 'block',
            width: '500px',
            height: 'auto',
        },
    })
    .addSelector({
        condition: ['type-textarea', 'showCounter'],
        common: {
            marginBottom: 30,
        },
    })
    .addSelector({
        condition: 'focused',
        common: {
            borderColor: '$color.primary.base',
            borderWidth: '0px 0px 2px 0px',
        },
    });

    input.addSelector({
        common: {
            lineHeight: '$input.height',
            // height: '$input.height',  // weird verticalAlign issue with placeholder and input text
            width: 180,
            minWidth: '100%',
            maxWidth: '100%',
            paddingTop: '$input.padding.top',
            paddingRight: '$input.padding.right',
            paddingBottom: '$input.padding.bottom',
            paddingLeft: '$input.padding.left',
            verticalAlign: 'middle',
            textIndent: '$input.textIndent',
            background: 'transparent',
            fontSize: 'inherit',
            color: 'inherit',
            appearance: 'none',
            borderWidth: '0',
            outline: 'none',
            position: 'relative',
            zIndex: 2,
            transition: 'padding 100ms',
            fontFamily: 'inherit',
        },
    }).addSelector({
        condition: 'type-textarea',
        common: {
            maxWidth: '100%',
            paddingTop: '$input.textareaPadding.top',
            paddingBottom: '$input.textareaPadding.bottom',
        },
    }).addSelector({
        condition: 'focused',
        common: {
            paddingLeft: '0px',
        },
    });

    placeholder.addSelector({
        common: {
            position: 'absolute',
            lineHeight: '$input.height',
            height: '$input.height',
            width: '100%',
            top: 0,
            left: 0,
            paddingRight: '$input.padding.right',
            paddingLeft: '$input.padding.left',
            textIndent: '$input.textIndent',
            zIndex: 1,
            color: '$input.color.placeholder',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            fontSize: 'inherit',
            transition: 'padding 100ms',
            verticalAlign: 'middle',
        },
    })
    .addSelector({
        condition: 'type-textarea',
        common: {
            lineHeight: 'normal',
            height: '100%',
            paddingTop: '$input.textareaPadding.top',
            paddingBottom: '$input.textareaPadding.bottom',
        },
    })
    .addSelector({
        condition: 'focused',
        common: {
            paddingLeft: '0px',
        },
    });

    charCounter.addSelector({
        common: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            marginBottom: -25,
        },
    });

    return sheet;
};
