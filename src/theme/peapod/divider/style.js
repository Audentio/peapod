module.exports = function (sheet) {
    const main = sheet.addMain();

    // Conditions
    sheet.addCondition('inline').addStyler({ inline: true });
    sheet.addCondition('indent').addStyler({ indent: ['!=', ''] });
    sheet.addCondition('outdent').addStyler({ outdent: ['!=', ''] });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                marginTop: '8px',
                marginBottom: '8px',
                height: '1px',
                background: 'rgba(0,0,0,.12)',
                display: 'inline-block',
            },
        }).addSelector({
            condition: ['inline'],
            common: {
                marginTop: '0px',
                marginBottom: '0px',
            },
        }).addSelector({
            condition: ['indent'],
            common: {
                marginLeft: 'getStyler:indent',
            },
        }).addSelector({
            condition: ['outdent'],
            common: {
                marginRight: 'getStyler:outdent',
            },
        });
    };

    return sheet;
};
