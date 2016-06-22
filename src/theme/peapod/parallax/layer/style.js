module.exports = function (sheet) {
    const main = sheet.addMain();

    // Conditions
    sheet.addCondition('fore').addProp({ level: 0 });
    sheet.addCondition('base').addProp({ level: 1 });
    sheet.addCondition('belowBase').addFunction((instance) => {
        return parseInt(instance.props.level, 10) > 1;
    });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                height: '200%',
                WebkitTransformOriginX: '100%',
                transformOriginX: '100%',
            },
        }).addSelector({
            condition: ['fore'],
            common: {
                transform: 'translateZ(100px) scale(.6666666)',
                zIndex(obj) {
                    return (obj.props.count - obj.props.level) + 1;
                },
            },
        }).addSelector({
            condition: ['base'],
            common: {
                transform: 'translateZ(0)',
                zIndex(obj) {
                    return (obj.props.count - obj.props.level) + 1;
                },
            },
        }).addSelector({
            condition: ['belowBase'],
            common: {
                transform(obj) {
                    return `translateZ(-${300 * (obj.props.level - 1)}px) scale(${obj.props.level})`;
                },
                zIndex(obj) {
                    return (obj.props.count - obj.props.level) + 1;
                },
            },
        });
    };

    return sheet;
};
