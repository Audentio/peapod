module.exports = function (sheet) {
    const main = sheet.addMain();
    const circle = sheet.addPart('circle');
    const mask = sheet.addPart('mask');
    const track = sheet.addPart('track');
    const content = sheet.addPart('content');
    const contentInner = sheet.addPart('contentInner');

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
    sheet.addCondition('indeterminate').addProp({ value: ['<', '0'] });

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
        main.addSelector({
            common: {
                width: component.size,
                height: component.size,
                fontSize: component.size,
                display: 'inline-block',
                position: 'relative',
                borderRadius: '1000px',
                WebkitClipPath: 'circle(50% at 50% 50%)',
                clipPath: 'circle(50% at 50% 50%)',
                overflow: 'hidden',
            },
        }).addSelector({
            condition: 'sizeSet',
            common: {
                width: 'getStyler:size',
                height: 'getStyler:size',
                fontSize: 'getStyler:size',
            },
        });

        content.addSelector({
            common: {
                display: 'table',
                width: '100%',
                height: '100%',
                position: 'absolute',
                fontSize: theme.font.size.normal,
            },
        });

        contentInner.addSelector({
            common: {
                display: 'table-cell',
                verticalAlign: 'middle',
                textAlign: 'center',
            },
        });

        track.addSelector({
            common: {
                width: '1em',
                height: '1em',
                position: 'absolute',
                borderWidth: component.stroke,
                borderStyle: 'solid',
                borderColor: theme.palette.grey200,
                borderRadius: '50%',
            },
        }).addSelector({
            condition: 'strokeSet',
            common: {
                borderWidth: 'getStyler:stroke',
            },
        });

        mask.addSelector({
            common: {
                width: '1em',
                height: '1em',
                transition: 'transform .2s linear',
                backfaceVisibility: 'hidden',
                position: 'absolute',
                clip: 'rect(0 1em 1em .5em)',
            },
        });

        circle.addSelector({
            common: {
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
            },
        })
        .addSelector({
            condition: 'strokeSet',
            common: {
                borderWidth: 'getStyler:stroke',
            },
        })
        .addSelector({
            condition: 'kindPrimary',
            common: {
                borderColor: theme.color.primary.base,
            },
        })
        .addSelector({
            condition: 'kindSuccess',
            common: {
                borderColor: theme.color.success.base,
            },
        })
        .addSelector({
            condition: 'kindInfo',
            common: {
                borderColor: theme.color.info.base,
            },
        })
        .addSelector({
            condition: 'kindWarning',
            common: {
                borderColor: theme.color.warning.active,
            },
        })
        .addSelector({
            condition: 'kindDanger',
            common: {
                borderColor: theme.color.danger.base,
            },
        })
        .addSelector({
            condition: 'kindSecondary',
            common: {
                borderColor: theme.color.secondary.base,
            },
        });
    };

    return sheet;
};
