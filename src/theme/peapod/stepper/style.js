import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const steps = sheet.addPart('steps');
    const step = sheet.addPart('step');
    const stepFirst = sheet.addPart('stepFirst');
    const stepLast = sheet.addPart('stepLast');
    const stepTitle = sheet.addPart('stepTitle');

    const progress = sheet.addPart('progress');


    const stepelem = sheet.addPart('stepelem');
    const activestep = sheet.addPart('activestep');
    const stepLine = sheet.addPart('stepLine');

    // Conditions

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            width: '100%',
            // border: '1px solid #ccc',
        },
    });

    steps.addSelector({
        common: {
            position: 'relative',
            display: 'table',
            width: '100%',
            tableLayout: 'fixed',
            padding: '20px',
            // background: '#dfdfdf',
            zIndex: '1',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        },
    });

    step.addSelector({
        common: {
            display: 'table-cell',
            textAlign: 'center',
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

    progress.addSelector({
        common:{
            width: '100%',
            height: '100%',
            backgroundImage(obj, scene) {
                const persent = parseInt(obj.state.complete);
                return `radial-gradient(circle at left, #f5f5f5 0%, #f5f5f5 ${persent}%, transparent ${persent}%, transparent 100%)`;
            },
            position: 'absolute',
            zIndex: '1',
        },
    });

    stepLine.addSelector({
        common: {
            position: 'absolute',
            top: '50%', left: 0, right: 0,
            display: 'block',
            // borderBottom: '1px solid #E0E0E0',
            // zIndex: '1',
        },
    });

    return sheet;
};
