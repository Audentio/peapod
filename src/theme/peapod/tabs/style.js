import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const trigger = sheet.addPart('trigger');
    const panel = sheet.addPart('panel');
    const triggers = sheet.addPart('triggers');
    const panels = sheet.addPart('panels');

    // Conditions
    sheet.addCondition('active').addStyler({ active: true });
    sheet.addCondition('inactive').addStyler({ active: false });

    // Variables
    sheet.setValues({});

    // Selectors
    main.addSelector({
        common: {
            // borderLeft: '10px solid {$color.primary.base}',
        },
    });

    trigger.addSelector({
        common: {
            display: 'inline-block',
            height: '48px',
            lineHeight: '48px',
            paddingRight: '$gutter.small',
            paddingLeft: '$gutter.small',
            color: '$color.base.hover',
            textDecoration: 'uppercase',
            marginRight: '1px',
            cursor: 'pointer',
        },
    }).addSelector({
        condition: ['active'],
        common: {
            color: '$color.primary.base',
            borderBottomWidth: '2px',
            borderStyle: 'solid',
            borderColor: '$color.primary.base',
        },
    });

    panel.addSelector({
        condition: ['inactive'],
        common: {
            display: 'none',
        },
    });

    triggers.addSelector({
        common: {
            backgroundColor: '$color.base.table',
        },
    });

    panels.addSelector({
        common: {
            padding: '{$gutter.internal}',
        },
    });

    return sheet;
};
