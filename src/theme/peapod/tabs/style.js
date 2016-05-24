import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    var sheet = new Sheet(sheetName),
        main = sheet.addMain(),
        trigger = sheet.addPart('trigger'),
        panel = sheet.addPart('panel'),
        triggers = sheet.addPart('triggers'),
        panels = sheet.addPart('panels');

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
            // backgroundColor: '$color.base.hover',
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
            // marginTop: '{$gutter.internal}',
            // padding: '0 {$gutter.internal}',
        },
    });

    panels.addSelector({
        common: {
            padding: '{$gutter.internal}',
        },
    });

    return sheet;
};
