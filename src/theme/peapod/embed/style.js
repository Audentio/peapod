module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('height').addProp({ height: ['!=', undefined] });
    sheet.addCondition('width').addProp({ width: ['!=', undefined] });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            display: 'block',
            width: '100%',
            height: '400px',
        }).selector('.main.--height', {
            height: (obj) => (obj.props.height),
        }).selector('.main.--width', {
            width: (obj) => (obj.props.width),
        });
    };

    return sheet;
};
