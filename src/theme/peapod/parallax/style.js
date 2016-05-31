import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const group = sheet.addPart('group');

    // Variables
    sheet.setValues({
        height: '100vh',
        width: '100%',
    });

    main.addSelector({
        common: {
            height: '100vh',
            background: '#ddd',
            overflow: 'hidden',
            WebkitPerspective: '300px',
            perspective: '300px',
            WebkitPerspectiveOriginX: '100%',
            perspectiveOriginX: '100%',
        },
    });
    group.addSelector({
        common: {
            position: 'relative',
            height: '100vh',
            WebkitTransformStyle: 'preserve-3d',
            transformStyle: 'preserve-3d',
        },
    });

    return sheet;
};
