module.exports = function (sheet) {
    const main = sheet.addMain();
    const scrolled = sheet.addPart('scrolled');

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                position: 'static',
                zIndex: theme.zIndex.level5,
                willChange: 'position',
                transition: 'all .3s',
            },
        });

        scrolled.addSelector({
            common: {
                // transition: 'all .3s',
            },
        });
    };

    return sheet;
};
