module.exports = function (sheet) {
    const main = sheet.addMain();
    const triggers = sheet.addPart('triggers');
    const panels = sheet.addPart('panels');

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                // borderLeft: '10px solid {$color.primary.base}',
            },
        });

        triggers.addSelector({
            common: {
                backgroundColor: theme.color.base.table,
            },
        });

        panels.addSelector({
            common: {
                padding: theme.gutter.internal,
            },
        });
    };

    return sheet;
};
