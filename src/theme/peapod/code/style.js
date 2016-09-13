module.exports = function (sheet) {
    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.addCondition('noHighLight').addProp({ noHighLight: true });

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            backgroundColor: theme.palette.blue50,
            color: theme.palette.blue700,
            padding: '1px 2px',
            fontSize: '85%',
            fontFamily: theme.font.family.code,
        }).selector('.main.--noHighLight', {
            backgroundColor: 'transparent',
            padding: '1px 0',
            color: theme.palette.grey800,
        });
    };

    return sheet;
};
