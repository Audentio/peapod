module.exports = function (sheet) {
    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            textAlign: 'center',
        });

        sheet.selector('.photo', {
            maxHeight: '100px',
            maxWidth: '100px',
            borderRadius: '1000px',
        });

        sheet.selector('.blockQuote', {
            background: 'transparent',
            border: 'none',
        });

        sheet.selector('.quoteIconRight', {
            fontSize: '120px',
            float: 'right',
            marginTop: '-15px',
            color: 'rgba(0,0,0,.1)',
        });

        sheet.selector('.quoteIconLeft', {
            fontSize: '120px',
            float: 'left',
            marginTop: '-15px',
            color: 'rgba(0,0,0,.1)',
            transform: 'scaleX(-1)',
        });

        sheet.selector('.quote', {});

        sheet.selector('.content', {});
    };

    return sheet;
};
