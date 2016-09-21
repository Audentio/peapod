module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('positionRight').addStyler({ position: 'right' });
    sheet.addCondition('positionLeft').addStyler({ position: 'left' });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            display: 'block',
            width: '100vw',
            height: '100vh',
            background: 'rgba(255,255,255,0.5)',
        }).selector('.main.--positionLeft', {
            width: '50%',
            float: 'left',
        }).selector('.main.--positionRight', {
            width: '50%',
            float: 'right',
        });
    };

    return sheet;
};
