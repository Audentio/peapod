module.exports = function (sheet) {
    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            color: theme.palette.grey500,
            width: '50px',
            height: '25px',
            lineHeight: '25px',
            float: 'left',
            background: '#fff',
            textAlign: 'center',
            overflow: 'hidden',
            // fontWeight: 'bold',
            display: 'block',
            borderRadius: '1000px',
        });
    };

    return sheet;
};
