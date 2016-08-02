module.exports = function (sheet) {
    const main = sheet.addMain();

    sheet.addCondition('round').addStyler({ round: true });
    const choices = ['success', 'danger', 'info', 'warning', 'secondary', 'base'];
    for (let choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
        sheet.addCondition('kind_' + choices[choiceIndex]).addStyler({ kind: choices[choiceIndex] });
    }

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            color: {
                text: theme.color.text.white,
            },
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                color: component.color.text,
                backgroundColor: theme.color.general.base,
                display: 'inline-block',
                paddingTop: theme.gutter.extrasmall,
                paddingBottom: theme.gutter.extrasmall,
                paddingLeft: theme.gutter.internal,
                paddingRight: theme.gutter.internal,
            },
        }).addSelector({
            condition: ['round'],
            common: {
                borderRadius: '1000px',
            },
        });

        for (let choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
            main.addSelector({
                condition: ['kind_' + choices[choiceIndex]],
                common: {
                    backgroundColor: theme.color[choices[choiceIndex]].base,
                },
            });
        }
    };

    return sheet;
};
