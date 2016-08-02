module.exports = function (sheet) {
    const main = sheet.addMain();

    const step = sheet.addPart('step');
    const stepFirst = sheet.addPart('stepFirst');
    const stepLast = sheet.addPart('stepLast');
    const stepTitle = sheet.addPart('stepTitle');
    const stepSubTitle = sheet.addPart('stepSubTitle');
    const stepelem = sheet.addPart('stepelem');
    const activestep = sheet.addPart('activestep');


    // Conditions
    sheet.addCondition('hasSubTitle').addFunction(instance => !instance.props.validation || instance.props.subtitle);
    sheet.addCondition('positionBelow').addProp({ below: true });
    sheet.addCondition('notClickable').addProp({ clickable: false });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                padding: theme.gutter.small,
                width: '100%',
            },
        });


        step.addSelector({
            common: {
                display: 'block',
                textAlign: 'center',
                flex: '1 1 auto',
            },
        });
        stepFirst.addSelector({
            common: {
                textAlign: 'left',
            },
        });
        stepLast.addSelector({
            common: {
                textAlign: 'right',
            },
        });
        stepTitle.addSelector({
            common: {
                padding: '5px 8px 5px 0',
                display: 'inline-block',
                textAlign: 'left',
            },
        }).addSelector({
            condition: ['hasSubTitle'],
            common: {
                padding: '0 8px 0 0',
                display: 'inline-block',
                textAlign: 'left',
            },
        }).addSelector({
            condition: ['positionBelow'],
            common: {
                padding: '5px 0 5px 0',
                display: 'block',
                textAlign: 'center',
            },
        });

        stepSubTitle.addSelector({
            common: {
                fontSize: '10px',
            },
        });
        stepelem.addSelector({
            common: {
                display: 'inline-block',
                borderRadius: '100px',
                width: '30px',
                height: '30px',
                lineHeight: '30px',
                textAlign: 'center',
                background: '#9E9E9E',
                color: 'white',
                marginLeft: '8px',
                marginRight: '8px',
                verticalAlign: 'top',
                // ':hover': {
                //     background: theme.palette.blue400,
                //     cursor: 'pointer',
                // },
            },
        }).addSelector({
            condition: ['notClickable'],
            common: {
                cursor: 'not-allowed',
            },
        });
        activestep.addSelector({
            common: {
                background: theme.palette.blue400,
                ':hover': {
                    background: theme.palette.blue400,
                },
            },
        });
    };

    return sheet;
};
