module.exports = function (sheet) {
    sheet.addCondition('multiline').addProp({ multiline: true });
    sheet.addCondition('full').addProp({ full: true });

    sheet.addCondition('kindGeneral').addStyler({ kind: 'general' });
    sheet.addCondition('kindInfo').addStyler({ kind: 'info' });
    sheet.addCondition('kindSuccess').addStyler({ kind: 'success' });
    sheet.addCondition('kindWarning').addStyler({ kind: 'warning' });
    sheet.addCondition('kindDanger').addStyler({ kind: 'danger' });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            background: {
                general: theme.color.base.base,
                success: theme.color.success.base,
                warning: theme.color.warning.active,
                info: theme.color.info.base,
                danger: theme.color.danger.base,
            },
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            bottom: theme.gutter.internal,
            right: theme.gutter.internal,
            position: 'fixed',
        });

        sheet.selector('.wrapper', {
            fontSize: theme.font.size.xsmall,
            borderRadius: theme.border.radius.small,
            width: '300px',
            height: '48px',
            lineHeight: '48px',
            padding: '0 24px',
            zIndex: '999',
            color: 'rgba(255,255,255,.8)',
            backgroundColor: '#323232',
        }).selector('.wrapper.--multiline', {
            height: '80px',
            padding: '24px',
            lineHeight: '1',
        }).selector('.wrapper.--multiline.--full', {
            height: '112px',
            lineHeight: '1',
        });

        const kinds = ['General', 'Success', 'Info', 'Warning', 'Danger'];
        for (let i = 0, len = kinds.length; i < len; i++) {
            const kind = kinds[i];
            sheet.selector(`.wrapper.--kind${kind}`, {
                backgroundColor: component.background[kind.toLowerCase()],
            });
        }

        sheet.selector('.title', {
            display: 'block',
            marginBottom: '4px',
            fontWeight: theme.font.weight.medium,
            color: 'white',
        });

        sheet.selector('.dismissIcon', {
            float: 'right',
            fontWeight: 'bold',
            color: theme.palette.yellow500,
            cursor: 'pointer',
            textTransform: 'uppercase',
            marginLeft: '24px',
        }).selector('.dismissIcon.--full', {
            marginTop: '24px',
        });
    };

    return sheet;
};
