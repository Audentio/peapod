module.exports = function (sheet) {
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
            get small() { return `@media (min-width: ${component.breakpoints.small}px)`; },
            get medium() { return `@media (min-width: ${component.breakpoints.medium}px)`; },
            get large() { return `@media (min-width: ${component.breakpoints.large}px)`; },
            get xlarge() { return `@media (min-width: ${component.breakpoints.xlarge}px)`; },
            get smallLt() { return `@media (min-width: ${component.breakpoints.small - 1}px)`; },
            get mediumLt() { return `@media (min-width: ${component.breakpoints.medium - 1}px)`; },
            get largeLt() { return `@media (min-width: ${component.breakpoints.large - 1}px)`; },
            get xlargeLt() { return `@media (min-width: ${component.breakpoints.xlarge - 1}px)`; },
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main.--orderSet', {
            order: (obj) => (obj.styler.order),
        }).selector('.main.--flexSet', {
            flex: (obj) => (obj.styler.flex),
        });

        for (let choiceIndex = 0; choiceIndex < flexChoices.length; choiceIndex++) { // loop through all choices
            sheet.selector(`.main.--alignSelf_${flexChoices[choiceIndex]}`, {
                alignSelf: flexChoices[choiceIndex],
            });
        }

        for (let sizeIndex = 0; sizeIndex < sizes.length; sizeIndex++) { // loop through all choices
            for (let i = 0; i < 13; i++) { // loop through size values
                sheet.selector(`.main.--${[abbrevs[sizeIndex]]}_${i}`, {
                    [component[sizes[sizeIndex]]]: {
                        width: `${(100 * (i / 12))}%`,
                    },
                }).selector(`.main.--${[abbrevs[sizeIndex]]}Push_${i}`, {
                    [component[sizes[sizeIndex]]]: {
                        position: 'relative',
                        left: (100 * (i / 12)) + '%',
                    },
                }).selector(`.main.--${[abbrevs[sizeIndex]]}Pull_${i}`, {
                    [component[sizes[sizeIndex]]]: {
                        position: 'relative',
                        left: (-100 * (i / 12)) + '%',
                    },
                });
            }
        }
    };

    return sheet;
};
