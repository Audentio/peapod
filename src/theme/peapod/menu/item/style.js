module.exports = function (sheet) {
    const main = sheet.addMain();
    const anchor = sheet.addPart('anchor');
    const button = sheet.addPart('button');
    const subtext = sheet.addPart('subtext');

    // Conditions
    sheet.addCondition('horizontal').addProp({ orientation: 'horizontal' });
    sheet.addCondition('hovered').addProp({ hovered: true });
    sheet.addCondition('text').addProp({ textstyle: 'text' });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
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
            },
        }).addSelector({
            condition: ['hovered'],
            common: {
                background: theme.palette.grey100,
            },
        }).addSelector({
            condition: ['text'],
            common: {
                background: 'transparent',
                paddingLeft: 0,
                paddingRight: 0,

                ':hover': {
                    background: 'transparent',
                },
            },
        }).addSelector({
            condition: ['hovered', 'text'],
            common: {
                background: 'transparent',
                paddingLeft: 0,
                paddingRight: 0,
            },
        }).addSelector({
            condition: ['horizontal'],
            common: {
                display: 'inline-block',
                paddingLeft: 0,
                paddingRight: 0,
            },
        });

        subtext.addSelector({
            common: {
                display: 'inline-block',
                textAlign: 'right',
                paddingLeft: theme.gutter.small,
                alignSelf: 'flex-end',
            },
        });

        anchor.addSelector({
            common: {
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
            },
        });

        button.addSelector({
            common: {},
        });

    };

    return sheet;
};
