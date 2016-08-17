module.exports = function (sheet) {
    const main = sheet.addMain();

    sheet.addCondition('sizeSet').addStyler({ size: ['!=', undefined] });
    sheet.addCondition('colorSet').addStyler({ color: ['!=', undefined] });

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
        main.addSelector({
            common: {
                fontSize: component.font.size,
                verticalAlign: 'middle',
            },
        }).addSelector({
            condition: ['sizeSet'],
            common: {
                fontSize: (obj) => (obj.styler.size),
            },
        }).addSelector({
            condition: ['colorSet'],
            common: {
                color: (obj) => (obj.styler.color),
            },
        });
    };

    return sheet;
};
