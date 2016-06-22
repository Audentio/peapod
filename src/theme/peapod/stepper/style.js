module.exports = function (sheet) {
    const main = sheet.addMain();
    const steps = sheet.addPart('steps');
    const progress = sheet.addPart('progress');
    const actionBar = sheet.addPart('actionBar');
    const animate = sheet.addPart('animate');

    const stepLine = sheet.addPart('stepLine');

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                width: '100%',
            },
        });

        animate.addSelector({
            common: {
                transition: 'max-height .3s',
            },
        });

        steps.addSelector({
            common: {
                position: 'relative',
                display: 'flex',
                width: '100%',
                padding: '19px 16px',
                // height: '72px',
                zIndex: '1',
            },
        });

        stepLine.addSelector({
            common: {
                display: 'block',
                flex: '20 1 auto',
                borderBottom: '1px solid #E0E0E0',
                height: '17px',
            },
        });

        progress.addSelector({
            common: {
                height: '300%',
                top: '-100%',
                left: '-200px',
                width(obj) {
                    return `calc(${parseInt(obj.state.complete, 10)}% + 200px)`;
                },
                borderRadius: '100000px',
                background: '#F5F5F5',
                position: 'absolute',
                zIndex: '1',
            },
        });

        actionBar.addSelector({
            common: {
                paddingLeft: theme.gutter.extrasmall,
                paddingRight: theme.gutter.extrasmall,
                paddingBottom: theme.gutter.internal,
            },
        });
    };

    return sheet;
};
