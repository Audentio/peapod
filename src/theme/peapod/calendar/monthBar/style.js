module.exports = function (sheet) {
    const main = sheet.addMain();
    const button = sheet.addPart('button');
    const icon = sheet.addPart('icon');

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
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
            },
        });

        button.addSelector({
            common: {
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
            },
        });

        icon.addSelector({
            common: {
                fontSize: '2em',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
            },
        });
    };

    return sheet;
};
