module.exports = function (sheet) {
    const main = sheet.addMain();
    const input = sheet.addPart('input');
    const track = sheet.addPart('track');
    const trackBackground = sheet.addPart('trackBackground');
    const handle = sheet.addPart('handle');
    const handleFocus = sheet.addPart('handleFocus');

    sheet.addCondition('handleActive').addState({ handleActive: true });
    sheet.addCondition('valueZero').addState({ handleLeft: 0 });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            mainColor: theme.color.primary.base,
            trackColor: theme.palette.grey300,
            trackFocusedColor: theme.palette.grey400,
            trackHeight: '4',
            handleHeight: '4',
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
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
                backgroundColor: component.trackColor,
                width: '100%',
                height: 4,
                position: 'relative',
                transition: 'backgroundColor .3s',
            },
        }).addSelector({
            condition: ['handleActive'],
            common: {
                backgroundColor: component.trackFocusedColor,
            },
        });
        trackBackground.addSelector({
            common: {
                backgroundColor: component.mainColor,
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
                backgroundColor: component.mainColor,
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
                backgroundColor: component.trackColor,
            },
        }).addSelector({
            condition: ['valueZero', 'handleActive'],
            common: {
                backgroundColor: component.trackFocusedColor,
            },
        });

        handleFocus.addSelector({
            common: {
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                bottom: '-10px',
                left: '-10px',
                background: component.mainColor,
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
                background: component.trackColor,
            },
        }).addSelector({
            condition: ['valueZero', 'handleActive'],
            common: {
                background: component.trackFocusedColor,
            },
        });

        if ('ontouchstart' in window) {
            handle.addSelector({});
        }
    };

    return sheet;
};
