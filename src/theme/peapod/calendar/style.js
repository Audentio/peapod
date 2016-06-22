module.exports = function (sheet) {
    const main = sheet.addMain();
    const dateBar = sheet.addPart('dateBar');
    // const year = sheet.addPart('year');
    const date = sheet.addPart('date');

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                width: '366px',
                background: '#fff',
                fontSize: '12px',
            },
        });

        dateBar.addSelector({
            common: {
                background: theme.palette.teal500,
                color: theme.palette.grey400,
                padding: theme.gutter.small,
                fontWeight: 'bold',
            },
        });

<<<<<<< HEAD
    date.addSelector({
        common: {
            fontSize: '$font.size.xlarge',
            color: 'white',
        },
    });
=======
        date.addSelector({
            common: {
                fontSize: theme.font.size.display1,
                color: 'white',
            },
        });
    };
>>>>>>> Audentio/master

    return sheet;
};
