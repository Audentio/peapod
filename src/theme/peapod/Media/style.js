module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('figureTop').addProp({ figureVertical: 'top' });
    sheet.addCondition('figureMiddle').addProp({ figureVertical: 'middle' });
    sheet.addCondition('figureBottom').addProp({ figureVertical: 'bottom' });

    sheet.addCondition('contentTop').addProp({ contentVertical: 'top' });
    sheet.addCondition('contentMiddle').addProp({ contentVertical: 'middle' });
    sheet.addCondition('contentBottom').addProp({ contentVertical: 'bottom' });

    sheet.addCondition('borderFigure', obj => obj.props.borderFigure);

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            display: 'flex',
            verticalAlign: 'bottom',
            alignItems: 'center',
            justifyContent: 'center',
        });

        const parts = ['figure', 'content'];

        for (let i = 0, len = parts.length; i < len; i++) {
            const part = parts[i];
            sheet.selector(`.${part}`, {
                alignSelf: 'flex-start',
                minWidth: (obj) => (obj.props.figureWidth),
            }).selector(`.${part}.--${part}Middle`, {
                alignSelf: 'flex-center',
            }).selector(`.${part}.--${part}Bottom`, {
                alignSelf: 'flex-end',
            });
        }

        sheet.selector('.figure.--borderFigure', {
            padding: '10px',
            backgroundColor: '#FFF',
            margin: '6px',
            boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        });
    };

    return sheet;
};
