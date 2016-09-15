module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('hasSubTitle', instance => !instance.props.validation || instance.props.subtitle);
    sheet.addCondition('positionBelow').addProp({ below: true });
    sheet.addCondition('notClickable').addProp({ clickable: false });
    sheet.addCondition('activeStep').addProp({ active: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            padding: theme.gutter.small,
            width: '100%',
        });

        sheet.selector('.step', {
            display: 'block',
            textAlign: 'center',
            flex: '1 1 auto',
        });

        sheet.selector('.stepFirst', {
            textAlign: 'left',
        });

        sheet.selector('.stepLast', {
            textAlign: 'right',
        });

        sheet.selector('.stepTitle', {
            padding: '5px 8px 5px 0',
            display: 'inline-block',
            textAlign: 'left',
        }).selector('.stepTitle.--hasSubTitle', {
            padding: '0 8px 0 0',
            display: 'inline-block',
            textAlign: 'left',
        }).selector('.stepTitle.--positionBelow', {
            padding: '5px 0 5px 0',
            display: 'block',
            textAlign: 'center',
        });

        sheet.selector('.stepSubTitle', {
            fontSize: '10px',
        });

        sheet.selector('stepelem', {
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
        }).selector('.stepelem.--notClickable', {
            cursor: 'not-allowed',
        }).selector('.stepelem.--activeStep', {
            background: theme.palette.blue400,
            ':hover': {
                background: theme.palette.blue400,
            },
        });
    };

    return sheet;
};
