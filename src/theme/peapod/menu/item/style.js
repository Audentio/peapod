module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('horizontal').addProp({ orientation: 'horizontal' });
    sheet.addCondition('text').addProp({ textstyle: 'text' });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            height: theme.gutter.large,
            lineHeight: theme.gutter.large,
            paddingLeft: theme.gutter.small,
            paddingRight: theme.gutter.small,
            background: theme.palette.white,
            // width: '100%',
            position: 'relative',
            color: 'inherit',
            ':hover': {
                background: theme.palette.grey100,
            },
        }).selector('.main.--text', {
            background: 'transparent',
            paddingLeft: 0,
            paddingRight: 0,

            ':hover': {
                background: 'transparent',
            },
        }).selector('.main.--horizontal', {
            display: 'inline-block',
            paddingLeft: 0,
            paddingRight: 0,
        });

        sheet.selector('.subtext', {
            display: 'inline-block',
            textAlign: 'right',
            paddingLeft: theme.gutter.small,
            alignSelf: 'flex-end',
        });

        sheet.selector('.anchor', {
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            ':hover': {
                color: 'inherit',
            },
        });

        sheet.selector('.button', {

        });
    };

    return sheet;
};
