module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('cover').addStyler({ cover: true });
    sheet.addCondition('contain').addStyler({ contain: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            display: 'block',
            width: '100%',
            height: '100vh',
            backgroundPosition: 'center center',
            fontFamily: theme.font.family.primary,
        }).selector('main.--cover', {
            backgroundSize: 'cover',
        }).selector('.main.--contain', {
            backgroundSize: 'contain',
        });
    };

    return sheet;
};
