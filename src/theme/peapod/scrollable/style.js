module.exports = function (sheet) {
    const main = sheet.addMain();

    // Conditions
    sheet.addCondition('horizontal').addProp({ horizontal: true });
    sheet.addCondition('height').addProp({ height: ['!=', undefined] });
    sheet.addCondition('center').addStyler({ center: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                overflowX: 'hidden',
                overflowY: 'auto',
            },
        }).addSelector({
            condition: ['horizontal'],
            common: {
                overflowX: 'auto',
                overflowY: 'hidden',
                whiteSpace: 'nowrap',
                height: '600px',
            },
        }).addSelector({
            condition: ['center'],
            common: {
                textAlign: 'center',
            },
        }).addSelector({
            condition: ['height'],
            common: {
                maxHeight: 'getProp:height',
            },
        });
    };

    return sheet;
};
