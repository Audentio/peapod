module.exports = function (sheet) {
    sheet.addCondition('onePage').addStyler({ onePage: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            border: {
                color: '#778A9D',
                width: '1px',
                style: 'solid',
            },
            font: {
                family: 'inherit',
                size: theme.font.size.normal,
                triggerSize: theme.font.size.xlarge,
            },
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            fontSize: component.font.size,
            fontFamily: component.font.family,
            display: 'inline-block',
        });

        sheet.selector('.trigger', {
            paddingLeft: '10px',
            paddingRight: '14px',
            width: '48px',
            textAlign: 'center',
            fontSize: component.font.triggerSize,
        });

        sheet.selector('.label', {
            paddingLeft: '32px',
            paddingRight: '22px',
        }).selector('.label.--onePage', {

        });
    };

    return sheet;
};
