import Radium from 'radium';

module.exports = function (sheet) {
    const main = sheet.addMain();
    const spinner = sheet.addPart('spinner');
    const rotate = sheet.addPart('rotate');

    // Conditions
    sheet.addCondition('show').addState({ show: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        const spin = {
            '0%': {
                transform: 'rotate(0deg)',
            },
            '100%': {
                transform: 'rotate(360deg)',
            },
        };

        const spinAnimation = Radium.keyframes(spin, 'spinAnimation');

        main.addSelector({
            common: {
                position: 'relative',
            },
        });
        spinner.addSelector({
            common: {
                visibility: 'hidden',
                opacity: 0,
                transition: 'opacity .5s',
                position: 'absolute',
                top: 0, right: 0,
                bottom: 0, left: 0,
                background: '#fefefe',
            },
        }).addSelector({
            condition: ['show'],
            common: {
                display: 'block',
                visibility: 'visible',
                opacity: '1',
            },
        });
        rotate.addSelector({
            common: {
                animationName: spinAnimation,
                animationDuration: '1000ms',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'linear',
                width: '50px',
                height: '50px',
            },
        });

    };

    return sheet;
};
