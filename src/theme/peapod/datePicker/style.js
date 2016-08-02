module.exports = function (sheet) {
    const main = sheet.addMain();
    const card = sheet.addPart('card');
    const calendar = sheet.addPart('calendar');

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                display: 'inline-block',
            },
        });
        card.addSelector({
            common: {
                marginTop: theme.gutter.internal,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0,
            },
        });
        calendar.addSelector({
            common: {},
        });
    };

    return sheet;
};
