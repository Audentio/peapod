module.exports = function (sheet) {
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
        sheet.selector('.main', {
            position: 'relative',
            padding: '7px 0',
            marginBottom: 15,
        });

        sheet.selector('.input', {
            display: 'none',
        });

        sheet.selector('.track', {
            backgroundColor: component.trackColor,
            width: '100%',
            height: 4,
            position: 'relative',
            transition: 'backgroundColor .3s',
        }).selector('.track.--handleActive', {
            backgroundColor: component.trackFocusedColor,
        });

        sheet.selector('.trackBackground', {
            backgroundColor: component.mainColor,
            height: 4,
            position: 'relative',
        });

        sheet.selector('.handle', {
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
        }).selector('.handle.--valueZero', {
            backgroundColor: component.trackColor,
        }).selector('.handle.--valueZero.--handleActive', {
            backgroundColor: component.trackFocusedColor,
        });

        sheet.selector('.handleFocus', {
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            bottom: '-10px',
            left: '-10px',
            background: component.mainColor,
            borderRadius: '1000px',
            opacity: 0,
            transition: 'opacity .3s',
        }).selector('.handleFocus.--handleActive', {
            opacity: 0.3,
        }).selector('.handleFocus.--valueZero', {
            background: component.trackColor,
        }).selector('.handleFocus.--valueZero.--handleActive', {
            background: component.trackFocusedColor,
        });
    };

    return sheet;
};
