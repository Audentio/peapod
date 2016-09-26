module.exports = function (sheet) {
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
        sheet.selector('.main', {
            overflow: 'hidden',
        }).selector('.main.--padded', {
            padding(obj) {
                return obj.props.padding || theme.gutter.small;
            },
        }).selector('.main.--alignLeft', {
            float: 'left',
            marginRight: theme.gutter.small,
        }).selector('.main.--alignRight', {
            float: 'right',
            marginLeft: theme.gutter.small,
        }).selector('.main.--alignCenter', {
            textAlign: 'center',
        });
    };

    return sheet;
};
