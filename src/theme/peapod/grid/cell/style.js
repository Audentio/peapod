module.exports = function (sheet) {
    const main = sheet.addMain();

    sheet.addCondition('orderSet').addStyler({ order: ['!=', undefined] });
    sheet.addCondition('flexSet').addStyler({ flex: ['!=', undefined] });

    // flex item align-self
    const flexChoices = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];
    for (let choiceIndex = 0; choiceIndex < flexChoices.length; choiceIndex++) { // loop through all choices
        sheet.addCondition('alignSelf_' + flexChoices[choiceIndex]).addStyler({ alignSelf: flexChoices[choiceIndex] });
    }

    const sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
    const abbrevs = ['xs', 'sm', 'md', 'lg', 'xl'];

    for (let sizeIndex = 0; sizeIndex < sizes.length; sizeIndex++) { // loop through all choices
        for (let i = 0; i < 13; i++) { // loop through size values
            sheet.addCondition([abbrevs[sizeIndex]] + '_' + i).addStyler({ [abbrevs[sizeIndex]]: i });
            sheet.addCondition([abbrevs[sizeIndex]] + 'Push_' + i).addStyler({ [abbrevs[sizeIndex] + 'Push']: i });
            sheet.addCondition([abbrevs[sizeIndex]] + 'Pull_' + i).addStyler({ [abbrevs[sizeIndex] + 'Pull']: i });
        }
    }

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            breakpoints: {
                small: '610',
                medium: '800',
                large: '1024',
                xlarge: '1500',
            },
            xsmall: '@media (min-width: 1px)',
            small: '@media (min-width: 610px)',
            medium: '@media (min-width: 800px)',
            large: '@media (min-width: 1024px)',
            xlarge: '@media (min-width: 1500px)',
            smallLt: '@media (max-width: 609px)',
            mediumLt: '@media (max-width: 799px)',
            largeLt: '@media (max-width: 1023px)',
            xlargeLt: '@media (max-width: 1499px)',
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
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

        for (let choiceIndex = 0; choiceIndex < flexChoices.length; choiceIndex++) { // loop through all choices
            main.addSelector({
                condition: ['alignSelf_' + flexChoices[choiceIndex]],
                common: {
                    alignSelf: flexChoices[choiceIndex],
                },
            });
        }

        for (let sizeIndex = 0; sizeIndex < sizes.length; sizeIndex++) { // loop through all choices
            for (let i = 0; i < 13; i++) { // loop through size values
                main.addSelector({
                    condition: [[abbrevs[sizeIndex]] + '_' + i],

                    common: {
                        [component[sizes[sizeIndex]]]: { width: (100 * (i / 12)) + '%' },
                    },
                });

                main.addSelector({
                    condition: [[abbrevs[sizeIndex]] + 'Push_' + i],
                    common: {
                        [component[sizes[sizeIndex]]]: {
                            position: 'relative',
                            left: (100 * (i / 12)) + '%',
                        },
                    },
                });

                main.addSelector({
                    condition: [[abbrevs[sizeIndex]] + 'Pull_' + i],
                    common: {
                        [component[sizes[sizeIndex]]]: {
                            position: 'relative',
                            left: (-100 * (i / 12)) + '%',
                        },
                    },
                });
            }
        }
    };

    return sheet;
};
