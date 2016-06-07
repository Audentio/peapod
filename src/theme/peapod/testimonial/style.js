import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const photo = sheet.addPart('photo');
    const blockQuote = sheet.addPart('blockQuote');
    const quoteIconRight = sheet.addPart('quoteIconRight');
    const quoteIconLeft = sheet.addPart('quoteIconLeft');

    const content = sheet.addPart('content');
    const quote = sheet.addPart('quote');

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
    quote.addSelector({
        common: {},
    });
    content.addSelector({
        common: {},
    });
    return sheet;
};
