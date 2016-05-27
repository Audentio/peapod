import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    var sheet = new Sheet(sheetName),
        main = sheet.addMain(),
        group = sheet.addPart('group'),
        spacer = sheet.addPart('spacer');

    // Conditions
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
    spacer.addSelector({
        common: {
            width: '100%',
            height: '50%',
        },
    });

    return sheet;
};
