module.exports = function (sheet) {
    sheet.addCondition('orderSet').addStyler({ order: ['!=', undefined] });
    sheet.addCondition('flexSet').addStyler({ flex: ['!=', undefined] });

    // flex-direction
    const directionChoices = ['row', 'row-reverse', 'column', 'column-reverse'];
    for (let choiceIndex = 0; choiceIndex < directionChoices.length; choiceIndex++) { // loop through all choices
        sheet.addCondition('flexDirection_' + directionChoices[choiceIndex]).addStyler({ flexDirection: directionChoices[choiceIndex] });
    }

    // flex-wrap
    const wrapChoices = ['nowrap', 'wrap', 'wrap-reverse'];
    for (let choiceIndex = 0; choiceIndex < wrapChoices.length; choiceIndex++) { // loop through all choices
        sheet.addCondition('flexWrap_' + wrapChoices[choiceIndex]).addStyler({ flexWrap: wrapChoices[choiceIndex] });
    }

    // justify-content
    const justifyChoices = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'];
    for (let choiceIndex = 0; choiceIndex < justifyChoices.length; choiceIndex++) { // loop through all choices
        sheet.addCondition('justifyContent_' + justifyChoices[choiceIndex]).addStyler({ justifyContent: justifyChoices[choiceIndex] });
    }

    // align-items
    const alignChoices = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];
    for (let choiceIndex = 0; choiceIndex < alignChoices.length; choiceIndex++) { // loop through all choices
        sheet.addCondition('alignItems_' + alignChoices[choiceIndex]).addStyler({ alignItems: alignChoices[choiceIndex] });
    }

    // align-content
    const contentChoices = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'];
    for (let choiceIndex = 0; choiceIndex < contentChoices.length; choiceIndex++) { // loop through all choices
        sheet.addCondition('alignContent_' + contentChoices[choiceIndex]).addStyler({ alignContent: contentChoices[choiceIndex] });
    }

    // flex item align-self
    const selfChoices = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];
    for (let choiceIndex = 0; choiceIndex < selfChoices.length; choiceIndex++) { // loop through all choices
        sheet.addCondition('alignSelf_' + selfChoices[choiceIndex]).addStyler({ alignSelf: selfChoices[choiceIndex] });
    }

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            alignContent: 'stretch',
        }).selector('.main.--orderSet', {
            order: (obj) => (obj.styler.order),
        }).selector('.main.--flexSet', {
            flex: (obj) => (obj.styler.flex),
        });

        for (let choiceIndex = 0; choiceIndex < directionChoices.length; choiceIndex++) { // loop through all choices
            sheet.selector(`.main.--flexDirection_${directionChoices[choiceIndex]}`, {
                flexDirection: directionChoices[choiceIndex],
            });
        }

        for (let choiceIndex = 0; choiceIndex < wrapChoices.length; choiceIndex++) { // loop through all choices
            sheet.selector(`.main.--flexWrap_${wrapChoices[choiceIndex]}`, {
                flexWrap: wrapChoices[choiceIndex],
            });
        }

        for (let choiceIndex = 0; choiceIndex < justifyChoices.length; choiceIndex++) { // loop through all choices
            sheet.selector(`.main.--justifyContent_${justifyChoices[choiceIndex]}`, {
                justifyContent: justifyChoices[choiceIndex],
            });
        }

        for (let choiceIndex = 0; choiceIndex < alignChoices.length; choiceIndex++) { // loop through all choices
            sheet.selector(`.main.--alignItems_${alignChoices[choiceIndex]}`, {
                alignItems: alignChoices[choiceIndex],
            });
        }

        for (let choiceIndex = 0; choiceIndex < contentChoices.length; choiceIndex++) { // loop through all choices
            sheet.selector(`.main.--alignContent_${contentChoices[choiceIndex]}`, {
                alignContent: contentChoices[choiceIndex],
            });
        }

        for (let choiceIndex = 0; choiceIndex < selfChoices.length; choiceIndex++) { // loop through all choices
            sheet.selector(`.main.--alignSelf_${selfChoices[choiceIndex]}`, {
                alignSelf: selfChoices[choiceIndex],
            });
        }
    };

    return sheet;
};
