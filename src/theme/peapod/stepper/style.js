module.exports = function (sheet) {
    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            width: '100%',
        });

        sheet.selector('.animate', {
            transition: 'max-height .3s',
        });

        sheet.selector('.steps', {
            position: 'relative',
            display: 'flex',
            width: '100%',
            padding: '19px 16px',
            // height: '72px',
            zIndex: '1',
        });

        sheet.selector('.stepLine', {
            display: 'block',
            flex: '20 1 auto',
            borderBottom: '1px solid #E0E0E0',
            height: '17px',
        });

        sheet.selector('.progress', {
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
        });

        sheet.selector('.actionBar', {
            paddingLeft: theme.gutter.extrasmall,
            paddingRight: theme.gutter.extrasmall,
            paddingBottom: theme.gutter.internal,
        });
    };

    return sheet;
};
