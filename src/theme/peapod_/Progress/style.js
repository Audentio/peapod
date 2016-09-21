import Radium from 'radium';

module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('kindPrimary').addStyler({ kind: 'primary' });
    sheet.addCondition('kindSuccess').addStyler({ kind: 'success' });
    sheet.addCondition('kindInfo').addStyler({ kind: 'info' });
    sheet.addCondition('kindWarning').addStyler({ kind: 'warning' });
    sheet.addCondition('kindDanger').addStyler({ kind: 'danger' });
    sheet.addCondition('kindSecondary').addStyler({ kind: 'secondary' });
    sheet.addCondition('indeterminate').addProp({ value: ['<', '0'] });
    sheet.addCondition('strokeSet').addStyler({ stroke: ['>', '0'] });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            height: 5,
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        const indeterminateKeyframes = Radium.keyframes({
            '0%': {
                transform: 'translate3d(-100%, 0,0)',
            },
            '100%': {
                transform: 'translate3d(105%, 0,0)',
            },
        }, 'indeterminate');

        sheet.selector('.main', {
            position: 'relative',
            zIndex: '1',
            width: '100%',
            height: component.height,
            // marginBottom: '$gutter.internal',
            overflow: 'hidden',
            // borderRadius: '2px',
            backgroundColor: theme.palette.grey200,
        }).selector('.main.--strokeSet', {
            height: (obj) => (obj.styler.stroke),
        });

        sheet.selector('.progress', {
            transformOrigin: 'left',
            backgroundColor: theme.color.primary.base,
            fill: theme.color.base.base,
            height: '100%',
            width: '100%',
            transition: '.2s',
        });

        const kinds = ['Primary', 'Success', 'Info', 'Warning', 'Danger', 'Secondary'];
        for (let i = 0, len = kinds.length; i < len; i++) {
            const kind = kinds[i];
            sheet.selector(`.progress.--kind${kind}`, {
                fill: theme.color[kind.toLowerCase()].base,
                backgroundColor: theme.color[kind.toLowerCase()].base,
            });
        }

        sheet.selector('.progress', {
            // backgroundColor: 'transparent',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,0.69) 9%,rgba(0,0,0,0.82) 22%,rgba(0,0,0,1) 50%,rgba(0,0,0,0.82) 78%,rgba(0,0,0,0.69) 91%,rgba(0,0,0,0) 100%)',
            backfaceVisibility: 'hidden',
            width: '100%',
            // animation: 'x 1500ms cubic-bezier(0.785, 0.135, 0.15, 0.86) 0s infinite',
            animation: 'x 1500ms ease 0s infinite',
            animationName: indeterminateKeyframes,
        });
    };

    return sheet;
};
