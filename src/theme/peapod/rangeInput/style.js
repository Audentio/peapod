import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const input = sheet.addPart('input');
    const track = sheet.addPart('track');
    const handle = sheet.addPart('handle');

    sheet.addCondition('handleActive').addState({ handleActive: true });

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
            backgroundColor: '#DADADA',
            width: '100%',
            height: 4,
            position: 'relative',
        },
    });

    const handleActiveStyle = {
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 5px',
    };

    handle.addSelector({
        common: {
            cursor: 'pointer',
            height: 14,
            width: 14,
            borderRadius: 100,
            backgroundColor: '#fff',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
            position: 'absolute',
            top: '50%',
            marginLeft: -7,
            marginTop: -7,
            ':hover': {
                boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.3)',
            },
            ':active': handleActiveStyle,
        },
    }).addSelector({
        condition: 'handleActive',
        common: handleActiveStyle,
    });

    if ('ontouchstart' in window) {
        handle.addSelector({
        });
    }

    return sheet;
};
