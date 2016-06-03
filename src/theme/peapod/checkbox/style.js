import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const innerBox = sheet.addPart('innerBox');
    const wrapper = sheet.addPart('wrapper');
    const box = sheet.addPart('box');
    const input = sheet.addPart('input');
    const icon = sheet.addPart('icon');
    const label = sheet.addPart('label');

    // Conditions
    sheet.addCondition('checked').addState({ checked: true });
    sheet.addCondition('disabled').addState({ disabled: true });
    sheet.addCondition('block').addStyler({ block: true });
    sheet.addCondition('hovered').addStyler({ hovered: true });

    // Variables
    sheet.setValues({
        width: '18px',
        height: '$checkbox.width',
        color: {
            text: '$color.text.dark',
            background: '$palette.grey50',
            backgroundChecked: '$palette.grey500',
            icon: '$color.text.white',
        },
        border: {
            color: '$palette.grey600',
            colorChecked: '$checkbox.color.backgroundChecked',
            radius: '$border.radius.small',
            width: '2px',
            style: 'solid',
        },
        font: {
            family: 'inherit',
            size: '$font.size.large',
        },
    }).setValues({
        color: {
            text: '$color.text.white',
            background: 'transparent',
        },
        border: {
            color: '$palette.white',
            colorChecked: '$palette.grey200',
        },
    }, 'dark');

    // Root
    innerBox.addSelector({
        common: {
            width: '$checkbox.width',
            height: '$checkbox.height',
            display: 'inline-block',
            backgroundColor: 'transparent',
            borderRadius: '$checkbox.border.radius',
            borderWidth: '$checkbox.border.width',
            borderStyle: '$checkbox.border.style',
            borderColor: '$checkbox.border.color',
            marginRight: '10px',
            verticalAlign: 'middle',
        },
    }).addSelector({
        condition: ['checked'],
        common: {
            backgroundColor: '$checkbox.color.backgroundChecked',
            borderColor: '$checkbox.border.colorChecked',
        },
    }).addSelector({
        condition: ['disabled'],
        common: {
            opacity: '0.6',
            borderColor: '$checkbox.border.colorChecked',
        },
    }).addSelector({
        condition: ['disabled', 'checked'],
        common: {
            opacity: '0.6',
            backgroundColor: '$checkbox.color.backgroundChecked',
            borderColor: '$checkbox.border.colorChecked',
        },
    });

    // Outer Wrapper
    main.addSelector({
        common: {
            display: 'inline-block',
        },
    }).addSelector({
        condition: 'block',
        common: {
            display: 'block',
        },
    });

    // Wrapper
    wrapper.addSelector({
        common: {
            display: 'flex',
            alignItems: 'center',
        },
    });

    // Box
    box.addSelector({
        common: {
            position: 'relative',
            cursor: 'pointer',
        },
    });

    // Input
    input.addSelector({
        common: {
            display: 'none',
        },
    });

    // Icon
    icon.addSelector({
        common: {
            color: '$checkbox.color.icon',
            position: 'absolute',
            cursor: 'pointer',
            top: '53%',
            transform: 'translateY(-50%)',
            left: '1px',
            display: 'none',
            fontSize: '$checkbox.font.size',
        },
    }).addSelector({
        condition: 'checked',
        common: {
            display: 'inline-block',
        },
    });

    // Label
    label.addSelector({
        common: {
            fontFamily: '$checkbox.font.family',
            fontSize: '$checkbox.font.size',
            color: '$checkbox.color.text',
        },
    });

    return sheet;
};
