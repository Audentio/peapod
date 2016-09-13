module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('active').addProp({ active: true });
    sheet.addCondition('inactive').addProp({ active: false });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            display: 'inline-block',
            height: '48px',
            lineHeight: '48px',
            paddingRight: theme.gutter.small,
            paddingLeft: theme.gutter.small,
            color: theme.color.base.hover,
            textDecoration: 'uppercase',
            marginRight: '1px',
            cursor: 'pointer',
        }).selector('.main.--active', {
            color: theme.color.primary.base,
            borderBottomWidth: '2px',
            borderStyle: 'solid',
            borderColor: theme.color.primary.base,
        });
    };

    return sheet;
};
