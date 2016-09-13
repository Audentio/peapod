module.exports = function (sheet) {
    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {});

        sheet.selector('.triggers', {
            backgroundColor: theme.color.base.table,
        });

        sheet.selector('.panels', {
            padding: theme.gutter.internal,
        });
    };

    return sheet;
};
