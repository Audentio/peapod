module.exports = function (sheet) {
    const main = sheet.addMain();

    // Conditions
    sheet.addCondition('height').addProp({ height: ['!=', undefined] });
    sheet.addCondition('width').addProp({ width: ['!=', undefined] });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                display: 'block',
                width: '100%',
                height: '400px',
            },
        }).addSelector({
            condition: ['height'],
            common: {
                height: (obj) => (obj.props.height),
            },
        }).addSelector({
            condition: ['width'],
            common: {
                width: (obj) => (obj.props.width),
            },
        });
    };

    return sheet;
};
