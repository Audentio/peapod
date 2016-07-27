module.exports = function (sheet) {
    const main = sheet.addMain();

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            width: '100%',
            height: '300px',
            background: '#efefef',
            padding: '30px',
            fontSize: '3em',
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                width: component.width,
                height: component.height,
                background: component.background,
                padding: component.padding,
                fontSize: component.fontSize,
            },
        });
    };

    return sheet;
};
