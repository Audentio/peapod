import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const wrapper = sheet.addPart('wrapper');
    const title = sheet.addPart('title');
    const dismissIcon = sheet.addPart('dismissIcon');

    sheet.addCondition('kindGeneral').addStyler({ kind: 'general' });
    sheet.addCondition('kindInfo').addStyler({ kind: 'info' });
    sheet.addCondition('kindSuccess').addStyler({ kind: 'success' });
    sheet.addCondition('kindWarning').addStyler({ kind: 'warning' });
    sheet.addCondition('kindDanger').addStyler({ kind: 'danger' });

    // Variables
    sheet.setValues({
        background: {
            general: '$color.base.base',
            success: '$color.success.base',
            warning: '$color.warning.active',
            info: '$color.info.base',
            danger: '$color.danger.base',
        },
    });

    main.addSelector({
        common: {},
    });

    wrapper.addSelector({
        common: {
            fontSize: '13px',
            padding: '1.3rem 4rem 1.3rem 1.5rem',
            borderRadius: '$border.radius.large',
            position: 'fixed',
            width: '300px',
            bottom: '$gutter.internal',
            right: '$gutter.internal',
            zIndex: '999',
            color: 'rgba(255,255,255,.8)',
        },
    })
    .addSelector({
        condition: 'kindGeneral',
        common: {
            backgroundColor: '$notification.background.general',
        },
    })
    .addSelector({
        condition: 'kindSuccess',
        common: {
            backgroundColor: '$notification.background.success',
        },
    })
    .addSelector({
        condition: 'kindInfo',
        common: {
            backgroundColor: '$notification.background.info',
        },
    })
    .addSelector({
        condition: 'kindWarning',
        common: {
            backgroundColor: '$notification.background.warning',
        },
    })
    .addSelector({
        condition: 'kindDanger',
        common: {
            backgroundColor: '$notification.background.danger',
        },
    });

    title.addSelector({
        common: {
            display: 'block',
            marginBottom: '4px',
            color: 'white',
        },
    });

    dismissIcon.addSelector({
        common: {
            position: 'absolute',
            top: '12px',
            right: '11px',
            padding: '4px',
            fontWeight: 'bold',
            borderRadius: '50%',
            fontSize: '1.4rem',
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',

            ':hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.35)',
            },
        },
    });

    return sheet;
};
