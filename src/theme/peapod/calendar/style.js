module.exports = function (sheet) {
    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            width: '366px',
            background: '#fff',
            fontSize: '12px',
        });

        sheet.selector('.dateBar', {
            background: theme.palette.teal500,
            color: theme.palette.grey400,
            padding: theme.gutter.small,
            fontWeight: 'bold',
        });

        sheet.selector('.date', {
            fontSize: theme.font.size.xlarge,
            color: 'white',
        });
    };

    return sheet;
};
