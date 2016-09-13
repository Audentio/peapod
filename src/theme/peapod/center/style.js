module.exports = function (sheet) {
    sheet.addCondition('textCenter').addFunction((obj) => {
        return obj.props.textCenter;
    })

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            display: 'table',
            width: '100%',
            height: '100%',
        });

        sheet.selector('.outer', {
            display: 'table-cell',
            verticalAlign: (obj) => (obj.props.valign || 'middle'),
            textAlign: (obj) => (obj.props.align || 'center'),
        });

        sheet.selector('.inner', {
            textAlign: 'left',
            display: 'inline-block',
        }).selector('.inner.--textCenter', {
            textAlign: 'center',
        });
    };

    return sheet;
};
