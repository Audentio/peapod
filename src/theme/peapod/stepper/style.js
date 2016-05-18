import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const steps = sheet.addPart('steps');
    const progress = sheet.addPart('progress');


    const stepLine = sheet.addPart('stepLine');

    // Conditions
    sheet.addCondition('hasSubTitle').addFunction((instance) => {
        // console.log(instance.props);
        return true;
    });

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
            display: 'flex',
            width: '100%',
            padding: '20px',
            // background: '#dfdfdf',
            zIndex: '1',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        },
    });

    stepLine.addSelector({
        common: {
            display: 'block',
            flex: '20 1 auto',
            borderBottom: '1px solid #E0E0E0',
            height: '17px',
            // zIndex: '1',
        },
    });

    progress.addSelector({
        common: {
            width: '100%',
            height: '100%',
            backgroundImage(obj) {
                const persent = parseInt(obj.state.complete);
                // const persent = 40;

                return `
                    radial-gradient(circle at left, blue 0%, blue 100px, transparent 100px, transparent 100%) , linear-gradient(to right, red ${persent}%, transparent ${persent}%)
                `;
            },
            backgroundPosition(obj) {
                const persent = parseInt(obj.state.complete);
                // const persent = 40;

                return '50% 0%';
            },
            position: 'absolute',
            zIndex: '1',
        },
    });

    return sheet;
};
