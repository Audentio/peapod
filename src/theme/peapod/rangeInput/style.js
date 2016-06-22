import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const input = sheet.addPart('input');
    const track = sheet.addPart('track');
    const trackBackground = sheet.addPart('trackBackground');
    const handle = sheet.addPart('handle');
    const handleFocus = sheet.addPart('handleFocus');

    sheet.addCondition('handleActive').addState({ handleActive: true });
    sheet.addCondition('valueZero').addState({ handleLeft: 0 });

    sheet.setValues({
        mainColor: '$color.primary.base',
        trackColor: '$palette.grey300',
        trackFocusedColor: '$palette.grey400',
        trackHeight: '4',
        handleHeight: '4',
    });

    main.addSelector({
        common: {
            position: 'relative',
            padding: '7px 0',
            marginBottom: 15,
        },
    });

    input.addSelector({
        common: {
            display: 'none',
        },
    });

    track.addSelector({
        common: {
            backgroundColor: '$rangeInput.trackColor',
            width: '100%',
            height: 4,
            position: 'relative',
            transition: 'backgroundColor .3s',
        },
    }).addSelector({
        condition: ['handleActive'],
        common: {
            backgroundColor: '$rangeInput.trackFocusedColor',
        },
    });
    trackBackground.addSelector({
        common: {
            backgroundColor: '$rangeInput.mainColor',
            height: 4,
            position: 'relative',
        },
    });

    handle.addSelector({
        common: {
            cursor: 'pointer',
            height: 14,
            width: 14,
            borderRadius: 100,
            backgroundColor: '$rangeInput.mainColor',
            // boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
            position: 'absolute',
            top: '50%',
            marginLeft: -7,
            marginTop: -7,
            transition: 'backgroundColor .3s',
        },
    }).addSelector({
        condition: ['valueZero'],
        common: {
            backgroundColor: '$rangeInput.trackColor',
        },
    }).addSelector({
        condition: ['valueZero', 'handleActive'],
        common: {
            backgroundColor: '$rangeInput.trackFocusedColor',
        },
    });

    handleFocus.addSelector({
        common: {
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            bottom: '-10px',
            left: '-10px',
            background: '$rangeInput.mainColor',
            borderRadius: '1000px',
            opacity: 0,
            transition: 'opacity .3s',
        },
    }).addSelector({
        condition: ['handleActive'],
        common: {
            opacity: 0.3,
        },
    }).addSelector({
        condition: ['valueZero'],
        common: {
            background: '$rangeInput.trackColor',
        },
    }).addSelector({
        condition: ['valueZero', 'handleActive'],
        common: {
            background: '$rangeInput.trackFocusedColor',
        },
    });

    if ('ontouchstart' in window) {
        handle.addSelector({});
    }

    return sheet;
};
