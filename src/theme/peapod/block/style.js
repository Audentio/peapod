module.exports = function (sheet) {
    const main = sheet.addMain();

    // Conditions
    sheet.addCondition('alignRight').addProp({ align: 'right' });
    sheet.addCondition('alignLeft').addProp({ align: 'left' });
    sheet.addCondition('alignCenter').addProp({ align: 'center' });
    sheet.addCondition('padded').addProp({ padded: ['!=', undefined] });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                overflow: 'hidden',
            },
        }).addSelector({
            condition: ['padded'],
            common: {
                padding(obj) {
                    return obj.props.padding || theme.gutter.small;
                },
            },
        }).addSelector({
            condition: ['alignLeft'],
            common: {
                float: 'left',
                marginRight: theme.gutter.small,
            },
        }).addSelector({
            condition: ['alignRight'],
            common: {
                float: 'right',
                marginLeft: theme.gutter.small,
            },
        }).addSelector({
            condition: ['alignCenter'],
            common: {
                textAlign: 'center',
            },
        });
    };

    return sheet;
};
