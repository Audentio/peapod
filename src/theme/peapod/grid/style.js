module.exports = function (sheet) {
    const main = sheet.addMain();

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
        main.addSelector({
            common: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                alignContent: 'stretch',
            },
        });

        main.addSelector({
            condition: ['orderSet'],
            common: {
                order: (obj) => (obj.styler.order),
            },
        });

        main.addSelector({
            condition: ['flexSet'],
            common: {
                flex: (obj) => (obj.styler.flex),
            },
        });

        for (let choiceIndex = 0; choiceIndex < directionChoices.length; choiceIndex++) { // loop through all choices
            main.addSelector({
                condition: ['flexDirection_' + directionChoices[choiceIndex]],
                common: {
                    flexDirection: directionChoices[choiceIndex],
                },
            });
        }

        for (let choiceIndex = 0; choiceIndex < wrapChoices.length; choiceIndex++) { // loop through all choices
            main.addSelector({
                condition: ['flexWrap_' + wrapChoices[choiceIndex]],
                common: {
                    flexWrap: wrapChoices[choiceIndex],
                },
            });
        }

        for (let choiceIndex = 0; choiceIndex < justifyChoices.length; choiceIndex++) { // loop through all choices
            main.addSelector({
                condition: ['justifyContent_' + justifyChoices[choiceIndex]],
                common: {
                    justifyContent: justifyChoices[choiceIndex],
                },
            });
        }

        for (let choiceIndex = 0; choiceIndex < alignChoices.length; choiceIndex++) { // loop through all choices
            main.addSelector({
                condition: ['alignItems_' + alignChoices[choiceIndex]],
                common: {
                    alignItems: alignChoices[choiceIndex],
                },
            });
        }

        for (let choiceIndex = 0; choiceIndex < contentChoices.length; choiceIndex++) { // loop through all choices
            main.addSelector({
                condition: ['alignContent_' + contentChoices[choiceIndex]],
                common: {
                    alignContent: contentChoices[choiceIndex],
                },
            });
        }

        for (let choiceIndex = 0; choiceIndex < selfChoices.length; choiceIndex++) { // loop through all choices
            main.addSelector({
                condition: ['alignSelf_' + selfChoices[choiceIndex]],
                common: {
                    alignSelf: selfChoices[choiceIndex],
                },
            });
        }
    };

    return sheet;
};
