import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const wrapper = sheet.addPart('wrapper');
    // const message = sheet.addPart('message');
    const dismissIcon = sheet.addPart('dismissIcon');

    sheet.addDoc(`# Purpose
    A component to make alerts.`);

    sheet.addCondition('kindGeneral').addStyler({ kind: 'general' });
    sheet.addCondition('kindInfo').addStyler({ kind: 'info' });
    sheet.addCondition('kindSuccess').addStyler({ kind: 'success' });
    sheet.addCondition('kindWarning').addStyler({ kind: 'warning' });
    sheet.addCondition('kindDanger').addStyler({ kind: 'danger' });

    // Variables
    sheet.setValues({
        background: {
            general: '$palette.grey300',
            success: '$palette.lightGreen100',
            warning: '$palette.yellow100',
            info: '$palette.blue100',
            danger: '$palette.red100',
        },
    });

    main.addSelector({});

    wrapper.addSelector({
        common: {
            fontSize: '$font.size.body1',
            position: 'relative',
            paddingLeft: '$gutter.large',
            paddingRight: '$gutter.large',
            borderRadius: '$border.radius.small',
            height: '$gutter.extralarge',
            lineHeight: '$gutter.extralarge',
            marginBottom: '$gutter.internal',
        },
    })
    .addSelector({
        condition: 'kindGeneral',
        common: {
            backgroundColor: '$alert.background.general',
        },
    })
    .addSelector({
        condition: 'kindSuccess',
        common: {
            backgroundColor: '$alert.background.success',
        },
    })
    .addSelector({
        condition: 'kindInfo',
        common: {
            backgroundColor: '$alert.background.info',
        },
    })
    .addSelector({
        condition: 'kindWarning',
        common: {
            backgroundColor: '$alert.background.warning',
        },
    })
    .addSelector({
        condition: 'kindDanger',
        common: {
            backgroundColor: '$alert.background.danger',
        },
    });

    dismissIcon.addSelector({
        common: {
            float: 'right',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            color: 'rgba(0,0,0,0.4)',
            cursor: 'pointer',
            marginLeft: '$gutter.extralarge',
            lineHeight: '$gutter.extralarge',
            height: '$gutter.extralarge',

            ':hover': {
                color: 'rgba(0,0,0,0.7)',
            },
        },
    });

    return sheet;
};
