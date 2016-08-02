module.exports = function (sheet) {
    const main = sheet.addMain();
    const actionBar = sheet.addPart('actionBar');
    const title = sheet.addPart('title');
    const content = sheet.addPart('content');

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
        main.addSelector({
            common: {
                backgroundColor: theme.palette.white,
                borderRadius: theme.border.radius.small,
                boxShadow: theme.shadows.d1,
                margin: component.padding.small,
                overflow: 'hidden',
                display: 'inline-block',
                textAlign: 'left',
                verticalAlign: 'top',
            },
        }).addSelector({
            condition: ['disguised'],
            common: {
                backgroundColor: 'transparent',
                boxShadow: 'none',
            },
        });

        title.addSelector({
            common: {
                paddingTop: component.padding.large,
                paddingLeft: component.padding.large,
                paddingRight: component.padding.large,
                paddingBottom: component.padding.small,
            },
        });

        content.addSelector({
            common: {
                overflow: 'hidden',
            },
        }).addSelector({
            condition: ['padded'],
            common: {
                paddingLeft: component.padding.large,
                paddingRight: component.padding.large,
            },
        });

        actionBar.addSelector({
            common: {
                padding: component.padding.small,
            },
        }).addSelector({
            condition: ['actionBarLeft'],
            common: {
                float: 'left',
                maxWidth: '56px',
                textAlign: 'center',
            },
        }).addSelector({
            condition: ['actionBarRight'],
            common: {
                float: 'right',
                maxWidth: '56px',
                textAlign: 'center',
            },
        });
    };

    return sheet;
};
