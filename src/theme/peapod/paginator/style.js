import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const trigger = sheet.addPart('trigger');
    const label = sheet.addPart('label');

    sheet.addCondition('onePage').addStyler({ onePage: true });

    // Variables
    sheet.setValues({
        border: {
            color: '#778A9D',
            width: '1px',
            style: 'solid',
        },
        font: {
            family: 'inherit',
            size: '$font.size.normal',
            triggerSize: '$font.size.xlarge',
        },
    });

    main.addSelector({
        common: {
            fontSize: '$paginator.font.size',
            fontFamily: '$paginator.font.family',
            display: 'inline-block',
        },
    });

    trigger.addSelector({
        common: {
            paddingLeft: '10px',
            paddingRight: '14px',
            width: '48px',
            textAlign: 'center',
            fontSize: '$paginator.font.triggerSize',
        },
    });

    label.addSelector({
        common: {
            paddingLeft: '32px',
            paddingRight: '22px',
            /*
            borderColor: '$paginator.border.color',
            borderStyle: '$paginator.border.style',
            borderTopWidth: '0px',
            borderBottomWidth: '0px',
            borderLeftWidth: '$paginator.border.width',
            borderRightWidth: '$paginator.border.width',
            */
        },
    }).addSelector({
        condition: ['onePage'],
        common: {
            // borderRightWidth: '0px',

        },
    });

    return sheet;
};
