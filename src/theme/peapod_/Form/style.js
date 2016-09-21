module.exports = function (sheet) {
    sheet.addCondition('disabled').addState({ disabled: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main.--disabled', {
            WebkitFilter: 'blur(3px)',
        });

        sheet.selector('.form', {
            position: 'relative',
            paddingTop: 15,
            WebkitFilter: 'none',
            transition: '.2s',
        });

        sheet.selector('.overlay', {
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
        }).selector('.overlay.--disabled', {
            visibility: 'visible',
            opacity: 1,
        });

        sheet.selector('.submit', {
            display: 'none',
        });
    };

    return sheet;
};
