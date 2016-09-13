module.exports = function (sheet) {
    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            width: '250px',
            height: '50px',
            lineHeight: '50px',
            marginTop: theme.gutter.extrasmall,
            background: '#fff',
            textAlign: 'center',
            overflow: 'hidden',
            color: theme.palette.grey800,
            display: 'block',
            float: 'left',
        });

        sheet.selector('.button', {
            width: '58px',
            height: '50px',
            lineHeight: '50px',
            marginTop: theme.gutter.extrasmall,
            background: 'white',
            textAlign: 'center',
            overflow: 'hidden',
            color: theme.palette.grey600,
            display: 'block',
            float: 'left',
            textDecoration: 'none',
            position: 'relative',
            userSelect: 'none',
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
            cursor: 'pointer',
        });

        sheet.selector('.icon', {
            fontSize: '2em',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
        });
    };

    return sheet;
};
