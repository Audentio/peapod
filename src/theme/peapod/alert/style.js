module.exports = function (sheet) {
    const main = sheet.addMain();
    const wrapper = sheet.addPart('wrapper');
    // const message = sheet.addPart('message');
    const dismissIcon = sheet.addPart('dismissIcon');

    sheet.addDoc(`# Purpose
    A component to make alerts.`);

    sheet.addCondition('kindGeneral').addStyler({ kind: 'general' });
    sheet.addCondition('kindInfo').addStyler({ kind: 'info' });
    sheet.addCondition('kindSuccess').addStyler({ kind: 'success' });
    sheet.addCondition('kindWarning').addStyler({ kind: 'warning' });
    sheet.addCondition('kindDanger').addStyler({ kind: 'danger' });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            background: {
                general: theme.palette.grey300,
                success: theme.palette.lightGreen100,
                warning: theme.palette.yellow100,
                info: theme.palette.blue100,
                danger: theme.palette.red100,
            },
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({});

        wrapper.addSelector({
            common: {
                fontSize: theme.font.size.body1,
                position: 'relative',
                paddingLeft: theme.gutter.large,
                paddingRight: theme.gutter.large,
                borderRadius: theme.border.radius.small,
                height: theme.gutter.extralarge,
                lineHeight: theme.gutter.extralarge,
                marginBottom: theme.gutter.internal,
            },
        })
        .addSelector({
            condition: 'kindGeneral',
            common: {
                backgroundColor: component.background.general,
            },
        })
        .addSelector({
            condition: 'kindSuccess',
            common: {
                backgroundColor: component.background.success,
            },
        })
        .addSelector({
            condition: 'kindInfo',
            common: {
                backgroundColor: component.background.info,
            },
        })
        .addSelector({
            condition: 'kindWarning',
            common: {
                backgroundColor: component.background.warning,
            },
        })
        .addSelector({
            condition: 'kindDanger',
            common: {
                backgroundColor: component.background.danger,
            },
        });

        dismissIcon.addSelector({
            common: {
                float: 'right',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                color: 'rgba(0,0,0,0.4)',
                cursor: 'pointer',
                marginLeft: theme.gutter.extralarge,
                lineHeight: theme.gutter.extralarge,
                height: theme.gutter.extralarge,

                ':hover': {
                    color: 'rgba(0,0,0,0.7)',
                },
            },
        });
    };

    return sheet;
};
