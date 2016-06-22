module.exports = function (sheet) {
    const main = sheet.addMain();
    const trigger = sheet.addPart('trigger');
    const label = sheet.addPart('label');

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
        main.addSelector({
            common: {
                fontSize: component.font.size,
                fontFamily: component.font.family,
                display: 'inline-block',
            },
        });

        trigger.addSelector({
            common: {
                paddingLeft: '10px',
                paddingRight: '14px',
                width: '48px',
                textAlign: 'center',
                fontSize: component.font.triggerSize,
            },
        });

        label.addSelector({
            common: {
                paddingLeft: '32px',
                paddingRight: '22px',
            },
        }).addSelector({
            condition: ['onePage'],
            common: {
                // borderRightWidth: '0px',

            },
        });
    };

    return sheet;
};
