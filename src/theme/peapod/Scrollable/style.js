module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('horizontal').addProp({ horizontal: true });
    sheet.addCondition('height').addProp({ height: ['!=', undefined] });
    sheet.addCondition('center').addStyler({ center: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            overflowX: 'hidden',
            overflowY: 'auto',
        }).selector('.main.--horizontal', {
            overflowX: 'auto',
            overflowY: 'hidden',
            whiteSpace: 'nowrap',
            height: '600px',
        }).selector('.main.--center', {
            textAlign: 'center',
        }).selector('.main.--height', {
            maxHeight: (obj) => (obj.props.height),
        });
    };

    return sheet;
};
