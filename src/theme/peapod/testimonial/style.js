import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const photo = sheet.addPart('photo');
    const blockQuote = sheet.addPart('blockQuote');
    const quoteIconRight = sheet.addPart('quoteIconRight');
    const quoteIconLeft = sheet.addPart('quoteIconLeft');

    sheet.addCondition('kindGeneral').addStyler({ kind: 'general' });
    sheet.addCondition('kindInfo').addStyler({ kind: 'info' });
    sheet.addCondition('kindSuccess').addStyler({ kind: 'success' });
    sheet.addCondition('kindWarning').addStyler({ kind: 'warning' });
    sheet.addCondition('kindDanger').addStyler({ kind: 'danger' });

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            textAlign: 'center',
        },
    });
    photo.addSelector({
        common: {
            maxHeight: '100px',
            maxWidth: '100px',
            borderRadius: '1000px',
        },
    });
    blockQuote.addSelector({
        common: {
            background: 'transparent',
            border: 'none',
        },
    });
    quoteIconRight.addSelector({
        common: {
            fontSize: '120px',
            float: 'right',
            marginTop: '-15px',
            color: 'rgba(0,0,0,.1)',
        },
    });
    quoteIconLeft.addSelector({
        common: {
            fontSize: '120px',
            float: 'left',
            marginTop: '-15px',
            color: 'rgba(0,0,0,.1)',
            transform: 'scaleX(-1)',
        },
    });
    return sheet;
};
