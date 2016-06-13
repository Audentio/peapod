import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const portal = sheet.addPart('portal');
    const trigger = sheet.addPart('trigger');
    const container = sheet.addPart('container');

    sheet.addCondition('level').addStyler({ level: 1 });
    sheet.addCondition('left').addStyler({ left: true });
    sheet.addCondition('text').addProp({ style: ['!=', undefined] });

    const add = (valueone, valuetwo) => (parseFloat(Pod_Vars.get(valueone)) + parseFloat(Pod_Vars.get(valuetwo)));

    // Variables
    sheet.setValues({
        background: '$palette.white',
        boxShadow: '$shadows.d1',
        paddingTop: '$gutter.internal',
        paddingBottom: '$gutter.internal',
        borderRadius: '$border.radius.small',
        zIndex: '$zIndex.level6',
    });

    container.addSelector({
        common: {
            display: 'inline-block',
        },
    });

    main.addSelector({
        common: {
            background: '$menu.background',
            boxShadow: '$menu.boxShadow',
            paddingTop: '$menu.paddingTop',
            paddingBottom: '$menu.paddingBottom',
            borderRadius: '$menu.borderRadius',
            zIndex: '$menu.zIndex',
            position: 'absolute',
        },
    }).addSelector({
        condition: ['text'],
        common: {
            background: 'transparent',
            boxShadow: 'none',
            position: 'static',
            paddingTop: '0',
            paddingBottom: '0',
        },
    }).addSelector({
        condition: ['level'],
        common: {
            whiteSpace: 'nowrap',
            transform: 'translate(0, -' + add('gutter.large', 'menu.paddingTop') + 'px)',
            left: '100%',
        },
    }).addSelector({
        condition: ['left'],
        common: {
            left: 'auto',
            right: '100%',
        },
    });

    portal.addSelector({
        common: {
            background: '$menu.background',
            boxShadow: '$menu.boxShadow',
            paddingTop: '$menu.paddingTop',
            paddingBottom: '$menu.paddingBottom',
            borderRadius: '$menu.borderRadius',
            zIndex: '$menu.zIndex',
            position: 'relative',
        },
    });

    trigger.addSelector({
        common: {
            display: 'inline-block',
            zIndex: '$menu.zIndex',
            position: 'relative',
        },
    }).addSelector({
        condition: ['level'],
        common: {
            display: 'block',
        },
    });

    return sheet;
};
