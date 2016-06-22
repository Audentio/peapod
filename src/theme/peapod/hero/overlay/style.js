module.exports = function (sheet) {
    const main = sheet.addMain();

    // Conditions
    sheet.addCondition('positionRight').addStyler({ position: 'right' });
    sheet.addCondition('positionLeft').addStyler({ position: 'left' });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                display: 'block',
                width: '100vw',
                height: '100vh',
                background: 'rgba(255,255,255,0.5)',
            },
        }).addSelector({
            condition: ['positionLeft'],
            common: {
                width: '50%',
                float: 'left',
            },
        }).addSelector({
            condition: ['positionRight'],
            common: {
                width: '50%',
                float: 'right',
            },
        });
    };

    return sheet;
};
