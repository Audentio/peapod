module.exports = function (sheet) {
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
        sheet.selector('.wrapper', {
            fontSize: theme.font.size.xsmall,
            position: 'relative',
            paddingLeft: theme.gutter.large,
            paddingRight: theme.gutter.large,
            borderRadius: theme.border.radius.small,
            height: theme.gutter.extralarge,
            lineHeight: theme.gutter.extralarge,
            marginBottom: theme.gutter.internal,
        });

        const kinds = ['General', 'Success', 'Info', 'Warning', 'Danger'];
        for (let i = 0, len = kinds.length; i < len; i++) {
            const kind = kinds[i];
            sheet.selector(`.wrapper.--kind${kind}`, {
                backgroundColor: component.background[kind.toLowerCase()],
            });
        }

        sheet.selector('.dismissIcon', {
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
        });
    };

    return sheet;
};
