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
                verticalAlign: (obj) => (obj.props.valign || 'middle'),
                textAlign: (obj) => (obj.props.align || 'center'),
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
