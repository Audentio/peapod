module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('notActive').addProp({ notActive: ['!=', undefined] });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            float: 'left',
            width: '40px',
            height: '40px',
            margin: '5px',
            lineHeight: '40px',
            background: '#fff',
            textAlign: 'center',
            overflow: 'hidden',
            color: theme.palette.grey900,
            display: 'block',
            borderRadius: '9999px',
            cursor: 'pointer',

            ':hover': {
                background: theme.palette.teal500,
                color: 'white',
            },
        }).selector('.main.--notActive', {
            color: 'transparent',
            background: 'transparent',
            pointerEvents: 'none',
            ':hover': {
                color: 'transparent',
                background: 'transparent',
            },
        });
    };

    return sheet;
};
