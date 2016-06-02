import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const submit = sheet.addPart('submit');
    const form = sheet.addPart('form');
    const overlay = sheet.addPart('overlay');

    sheet.addCondition('disabled').addState({ disabled: true });

    form.addSelector({
        common: {
            position: 'relative',
            paddingTop: 15,
            WebkitFilter: 'none',
            transition: '.2s',
        },
    });

    main.addSelector({
        condition: 'disabled',
        common: {
            WebkitFilter: 'blur(3px)',
        },
    });

    overlay.addSelector({
        common: {
            backgroundColor: 'rgba(255,255,255, 0)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 10,
            visibility: 'hidden',
            transition: '.2s',
            opacity: 0,
        },
    });

    overlay.addSelector({
        condition: 'disabled',
        common: {
            visibility: 'visible',
            opacity: 1,
        },
    });

    submit.addSelector({
        common: {
            display: 'none',
        },
    });

    return sheet;
};
