module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('isFirst').addProp({ isFirst: true });
    sheet.addCondition('isLast').addProp({ isLast: true });
    sheet.addCondition('isActive').addProp({ active: true });
    sheet.addCondition('notActive').addProp({ active: false });

    sheet.addCondition('horizontal').addProp({ horizontal: true });
    sheet.addCondition('notHorizontal').addProp({ horizontal: undefined });
    sheet.addCondition('open').addState({ open: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            titleHeight: '42px',
            border: {
                width: '1px',
                color: theme.palette.grey400,
            },
            background: {
                base: '#fff',
                hover: theme.palette.grey200,
            },
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            width: '100%',
            marginTop: 0,
            marginBottom: 0,
            transition: 'margin .3s',
        }).selector('.main.--open', {
            width: '100%',
            marginTop: theme.gutter.internal,
            marginBottom: theme.gutter.internal,
            transition: 'margin .3s',
        }).selector('.main.--open.--isFirst', {
            marginTop: '0',
            transition: 'margin .3s',
        }).selector('.main.--open.--isLast', {
            marginBottom: '0',
            transition: 'margin .3s',
        }).selector('.main.--horizontal', {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
        });

        sheet.selector('.title', {
            borderStyle: 'solid',
            zIndex: '100',
            position: 'relative',
            background: component.background.base,
            borderColor: '#ddd',
            borderWidth: '1px 0 0',
            paddingLeft: theme.gutter.small,
            paddingRight: theme.gutter.internal,
            height: component.titleHeight,
            lineHeight: component.titleHeight,
        }).selector('.title.--horizontal', {
            borderBottomWidth: 1,
            borderRightWidth: 0,
        }).selector('.title.--horizontal.--isLast.--notActive', {
            borderRightWidth: 1,
        });

        sheet.selector('.mainTitle', {
            color: theme.palette.grey900,
        });

        sheet.selector('.subtitle', {
            display: 'inline-block',
            paddingRight: theme.gutter.internal,
            minWidth: '25%',
            color: theme.palette.grey600,
        });

        sheet.selector('.icon', {
            fontSize: '2em',
            float: 'right',
            height: component.titleHeight,
            lineHeight: component.titleHeight,
            transition: 'transform .3s',
            color: theme.palette.grey500,
        }).selector('.icon.--open', {
            transform: 'rotate(180deg)',
            transition: 'transform .3s',
        });

        sheet.selector('.contentWrap', {
            borderStyle: 'solid',
            borderColor: '#ddd',
            borderWidth: '0',
            width: '100%',
            overflow: 'hidden',
            transitionProperty: 'max-height, border-width',
            transitionDuration: '.3s, .3s',
        }).selector('.contentWrap.--isLast', {
            borderBottomWidth: '1px',
        }).selector('.contentWrap.--open', {
            borderTopWidth: '1px',
        }).selector('.contentWrap.--horizontal', {
            borderBottomWidth: 1,
            borderRightWidth: 0,
            width: 'auto',
            maxWidth: 0,
        }).selector('.contentWrap.--horizontal.--isLast.--isActive', {
            borderRightWidth: 1,
        }).selector('.contentWrap.--notHorizontal', {
            maxHeight: 0,
        }).selector('.contentWrap.--open.--notHorizontal', {
            maxHeight: '500px',
        }).selector('.contentWrap.--open.--horizontal', {
            maxWidth: '500px',
        });

        sheet.selector('.content', {
            padding: theme.gutter.small,
        });
    };

    return sheet;
};
