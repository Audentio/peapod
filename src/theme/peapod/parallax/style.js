module.exports = function (sheet) {
    const main = sheet.addMain();
    const group = sheet.addPart('group');

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            height: '100vh',
            width: '100%',
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                height: component.height,
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
                height: component.height,
                WebkitTransformStyle: 'preserve-3d',
                transformStyle: 'preserve-3d',
            },
        });
    };

    return sheet;
};
