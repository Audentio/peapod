import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const wrapper = sheet.addPart('wrapper');
    const message = sheet.addPart('message');
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

    wrapper.addSelector({
        common: {
            fontSize: '13px',
            position: 'relative',
            padding: '1.3rem 4rem 1.3rem 1.5rem',
            borderRadius: '$border.radius.large',
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
            position: 'absolute',
            top: '0px',
            right: '0px',
            padding: '1.5rem',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            color: 'rgba(0,0,0,0.4)',
            cursor: 'pointer',

            ':hover': {
                color: 'rgba(0,0,0,0.7)',
            },
        },
    });

    return sheet;
};
