module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('inline').addStyler({ inline: true });
    sheet.addCondition('indent').addStyler({ indent: ['!=', ''] });
    sheet.addCondition('outdent').addStyler({ outdent: ['!=', ''] });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            marginTop: '8px',
            marginBottom: '8px',
            height: '1px',
            background: 'rgba(0,0,0,.12)',
            display: 'inline-block',
            width: '100%',
        }).selector('.main.--inline', {
            marginTop: '0px',
            marginBottom: '0px',
        }).selector('.main.--indent', {
            marginLeft: (obj) => (obj.styler.indent),
        }).selector('.main.--outdent', {
            marginRight: (obj) => (obj.styler.outdent),
        });
    };

    return sheet;
};
