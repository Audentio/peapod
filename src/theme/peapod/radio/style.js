import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    // const wrapper_outer = sheet.addPart('wrapper_outer');
    // const wrapper_inner = sheet.addPart('wrapper_inner');
    const radio_outer = sheet.addPart('radio_outer');
    const radio_inner = sheet.addPart('radio_inner');
    const radio_element = sheet.addPart('radio_element');
    const label = sheet.addPart('label');

    // Conditions
    sheet.addCondition('checked').addState({ checked: true });
    sheet.addCondition('block').addStyler({ block: true });
    sheet.addCondition('hovered').addStyler({ hovered: true });

    // Variables
    sheet.setValues({
        width: '1.5rem',
        height: '$radio.width',
        color: {
            text: '$color.text.dark',
            background: '$palette.grey500',
            backgroundChecked: '$color.primary.base',
            icon: '$color.text.white',
        },
        border: {
            color: '$palette.grey200',
            colorChecked: '$radio.color.backgroundChecked',
            radius: '$border.radius.large',
            width: '2px',
            style: 'solid',
        },
        font: {
            family: 'inherit',
            size: '$font.size.normal',
        },
    }).setValues({
        color: {
            text: '$color.text.white',
            background: 'transparent',
        },
        border: {
            color: '$radio.color.text',
        },
    }, 'dark');

    main.addSelector({});

    radio_outer.addSelector({
        common: {
            width: '$radio.width',
            height: '$radio.height',
            background: 'transparent',
            borderWidth: '$radio.border.width',
            borderStyle: '$radio.border.style',
            borderColor: '$radio.color.background',
            display: 'inline-block',
            marginRight: '$gutter.extrasmall',
            borderRadius: '1000px',
            position: 'relative',
            verticalAlign: 'middle',
        },
    });
    radio_inner.addSelector({
        condition: ['checked'],
        common: {
            display: 'block',
            borderRadius: '1000px',
            background: '$radio.color.background',
            position: 'absolute',
            top: '$radio.border.width', left: '$radio.border.width',
            bottom: '$radio.border.width', right: '$radio.border.width',
        },
    });
    radio_element.addSelector({
        common: {
            display: 'none',
        },
    });

    label.addSelector({
        common: {
            fontSize: '$radio.font.size',
            verticalAlign: 'middle',
        },
    });

    return sheet;
};
