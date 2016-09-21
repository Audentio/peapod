module.exports = function (sheet) {
    sheet.addCondition('sizeSet').addProp({ size: ['!=', undefined] });
    sheet.addCondition('colorSet').addProp({ color: ['!=', undefined] });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            font: {
                size: 'inherit',
            },
            color: 'inherit',
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            fontSize: component.font.size,
            verticalAlign: 'middle',
        }).selector('.main.--sizeSet', {
            fontSize: (obj) => (obj.props.size),
        }).selector('.main.--colorSet', {
            color: (obj) => (obj.props.color),
        });
    };

    return sheet;
};
