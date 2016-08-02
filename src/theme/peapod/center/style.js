module.exports = function (sheet) {
    const main = sheet.addMain();
    const outer = sheet.addPart('outer');
    const inner = sheet.addPart('inner');

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                display: 'table',
                width: '100%',
                height: '100%',
            },
        });

        outer.addSelector({
            common: {
                display: 'table-cell',
                verticalAlign: 'getProp:valign',
                textAlign: 'getProp:align',
            },
        });

        inner.addSelector({
            common: {
                textAlign: 'left',
                display: 'inline-block',
            },
        });
    };

    return sheet;
};
