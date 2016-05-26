import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Conditions
    sheet.addCondition('fore').addProp({ level: 0 });
    sheet.addCondition('base').addProp({ level: 1 });
    sheet.addCondition('belowBase').addProp({ level: ['>', 1] });

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            WebkitTransformOriginX: '100%',
            transformOriginX: '100%',
        },
    }).addSelector({
        condition: ['fore'],
        common: {
            transform: 'translateZ(100px) scale(.6666666)',
            zIndex: '5', // count - level
        },
    }).addSelector({
        condition: ['base'],
        common: {
            transform: 'translateZ(0)',
            zIndex: '4', // count - level
        },
    }).addSelector({
        condition: ['belowBase'],
        common: {
            transform: `translateZ(-${/* 300 * level */}) scale(${/* level */})`,
            zIndex: '3', // count - level
        },
    });

    return sheet;
};
