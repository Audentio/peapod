module.exports = function (sheet) {
    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            height: '100vh',
            width: '100%',
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            height: component.height,
            background: '#ddd',
            overflow: 'hidden',
            WebkitPerspective: '300px',
            perspective: '300px',
            WebkitPerspectiveOriginX: '100%',
            perspectiveOriginX: '100%',
        });

        sheet.selector('.group', {
            position: 'relative',
            height: component.height,
            WebkitTransformStyle: 'preserve-3d',
            transformStyle: 'preserve-3d',
        });
    };

    return sheet;
};
