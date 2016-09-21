module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('disguised').addStyler({ disguised: true });
    sheet.addCondition('padded').addStyler({ padded: true });
    sheet.addCondition('actionBarLeft').addProp({ actionBarLocation: 'left' });
    sheet.addCondition('actionBarRight').addProp({ actionBarLocation: 'right' });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            padding: {
                large: theme.gutter.internal,
                small: theme.gutter.extrasmall,
            },
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            backgroundColor: theme.palette.white,
            borderRadius: theme.border.radius.small,
            boxShadow: theme.shadows.d1,
            margin: component.padding.small,
            overflow: 'hidden',
            display: 'inline-block',
            textAlign: 'left',
            verticalAlign: 'top',
        }).selector('.main.--disguised', {
            backgroundColor: 'transparent',
            boxShadow: 'none',
        });

        sheet.selector('.title', {
            paddingTop: component.padding.large,
            paddingLeft: component.padding.large,
            paddingRight: component.padding.large,
            paddingBottom: component.padding.small,
        });

        sheet.selector('.content', {
            overflow: 'hidden',
        }).selector('.content.--padded', {
            paddingLeft: component.padding.large,
            paddingRight: component.padding.large,
        });

        sheet.selector('.actionBar', {
            padding: component.padding.small,
        }).selector('.actionBar.--actionBarLeft', {
            float: 'left',
            maxWidth: '56px',
            textAlign: 'center',
        }).selector('.actionBar.--actionBarRight', {
            float: 'right',
            maxWidth: '56px',
            textAlign: 'center',
        });
    };

    return sheet;
};
