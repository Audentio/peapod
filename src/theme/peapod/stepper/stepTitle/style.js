import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
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

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            padding: '$gutter.small',
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
            padding: '5px',
            display: 'inline-block',
            textAlign: 'left',
        },
    }).addSelector({
        condition: ['hasSubTitle'],
        common: {
            padding: '0 5px',
            display: 'inline-block',
            textAlign: 'left',
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
            marginLeft: '5px',
            marginRight: '5px',
            verticalAlign: 'top',
            // ':hover': {
            //     background: '$palette.blue400',
            //     cursor: 'pointer',
            // },
        },
    });
    activestep.addSelector({
        common: {
            background: '$palette.blue400',
            ':hover': {
                background: '$palette.blue400',
            },
        },
    });

    return sheet;
};
