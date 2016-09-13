import Radium from 'radium';

module.exports = function (sheet) {
    sheet.addDocDefault({
        value: Math.random() * 100,
        children: '%',
    });

    // Conditions
    sheet.addCondition('kindPrimary').addStyler({ kind: 'primary' });
    sheet.addCondition('kindSuccess').addStyler({ kind: 'success' });
    sheet.addCondition('kindInfo').addStyler({ kind: 'info' });
    sheet.addCondition('kindWarning').addStyler({ kind: 'warning' });
    sheet.addCondition('kindDanger').addStyler({ kind: 'danger' });
    sheet.addCondition('kindSecondary').addStyler({ kind: 'secondary' });
    sheet.addCondition('indeterminate').addProp({ indeterminate: true });

    sheet.addCondition('sizeSet').addStyler({ size: ['>', '0'] });
    sheet.addCondition('strokeSet').addStyler({ stroke: ['>', '0'] });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            stroke: 4,
            size: 50,
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        const indeterminateKeyframes = Radium.keyframes({
            '0%': {
                transform: 'rotate(0deg)',
            },
            '100%': {
                transform: 'rotate(360deg)',
            },
        }, 'indeterminate');

        sheet.selector('.main', {
            width: component.size,
            height: component.size,
            fontSize: component.size,
            display: 'inline-block',
            position: 'relative',
            borderRadius: '1000px',
            WebkitClipPath: 'circle(50% at 50% 50%)',
            clipPath: 'circle(50% at 50% 50%)',
            overflow: 'hidden',
        }).selector('.main.--sizeSet', {
            width: (obj) => (obj.styler.size),
            height: (obj) => (obj.styler.size),
            fontSize: (obj) => (obj.styler.size),
        }).selector('.main.--indeterminate', {
            // backgroundColor: 'transparent',
            // WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,0.69) 9%,rgba(0,0,0,0.82) 22%,rgba(0,0,0,1) 50%,rgba(0,0,0,0.82) 78%,rgba(0,0,0,0.69) 91%,rgba(0,0,0,0) 100%)',
            backfaceVisibility: 'hidden',
            // width: '100%',
            animation: 'x 500ms linear 0s infinite',
            animationName: indeterminateKeyframes,
        });

        sheet.selector('.content', {
            display: 'table',
            width: '100%',
            height: '100%',
            position: 'absolute',
            fontSize: theme.font.size.normal,
        });

        sheet.selector('.contentInner', {
            display: 'table-cell',
            verticalAlign: 'middle',
            textAlign: 'center',
        });

        sheet.selector('.track', {
            width: '1em',
            height: '1em',
            position: 'absolute',
            borderWidth: component.stroke,
            borderStyle: 'solid',
            borderColor: theme.palette.grey200,
            borderRadius: '50%',
        }).selector('.track.--strokeSet', {
            borderWidth: (obj) => (obj.styler.stroke),
        });

        sheet.selector('.mask', {
            width: '1em',
            height: '1em',
            transition: 'transform .2s linear',
            backfaceVisibility: 'hidden',
            position: 'absolute',
            clip: 'rect(0 1em 1em .5em)',
        });

        sheet.selector('.circle', {
            width: '1em',
            height: '1em',
            transition: 'transform .2s linear',
            backfaceVisibility: 'hidden',
            position: 'absolute',
            borderWidth: component.stroke,
            borderStyle: 'solid',
            borderColor: theme.color.base.base,
            clip: 'rect(0 .5em 1em 0)',
            borderRadius: '1000px',
        }).selector('.circle.--strokeSet', {
            borderWidth: (obj) => (obj.styler.stroke),
        });

        const kinds = ['Primary', 'Success', 'Info', 'Warning', 'Danger', 'Secondary'];

        for (let i = 0, len = kinds.length; i < len; i++) {
            const kind = kinds[i];
            sheet.selector(`.circle.--kind${kind}`, {
                borderColor: theme.color[kind.toLowerCase()].base,
            });
        }
    };

    return sheet;
};
