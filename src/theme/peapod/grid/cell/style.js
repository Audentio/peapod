import Pod_Vars from 'utility/vars.js';

import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Variables
    sheet.setValues({
        breakpoints: {
            small: '610',
            medium: '800',
            large: '1024',
            xlarge: '1500',
        },
        xsmall: '@media (minWidth: 1px)',
        small: '@media (minWidth: 610px)',
        medium: '@media (minWidth: 800px)',
        large: '@media (minWidth: 1024px)',
        xlarge: '@media (minWidth: 1500px)',
        smallLt: '@media (maxWidth: 609px)',
        mediumLt: '@media (maxWidth: 799px)',
        largeLt: '@media (maxWidth: 1023px)',
        xlargeLt: '@media (maxWidth: 1499px)',
    });

    sheet.addCondition('orderSet').addStyler({ order: ['!=', undefined] });
    main.addSelector({
        condition: ['orderSet'],
        common: {
            order: 'getStyler:order',
        },
    });

    sheet.addCondition('flexSet').addStyler({ flex: ['!=', undefined] });
    main.addSelector({
        condition: ['flexSet'],
        common: {
            flex: 'getStyler:flex',
        },
    });

    // flex item align-self
    const choices = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];
    for (let choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
        sheet.addCondition('alignSelf_' + choices[choiceIndex]).addStyler({ alignSelf: choices[choiceIndex] });
        main.addSelector({
            condition: ['alignSelf_' + choices[choiceIndex]],
            common: {
                alignSelf: choices[choiceIndex],
            },
        });
    }

    const sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
    const abbrevs = ['xs', 'sm', 'md', 'lg', 'xl'];

    for (let sizeIndex = 0; sizeIndex < sizes.length; sizeIndex++) { // loop through all choices
        for (let i = 0; i < 13; i++) { // loop through size values
            sheet.addCondition([abbrevs[sizeIndex]] + '_' + i).addStyler({ [abbrevs[sizeIndex]]: i });
            main.addSelector({
                condition: [[abbrevs[sizeIndex]] + '_' + i],

                common: {
                    [Pod_Vars.get('grid_cell.' + sizes[sizeIndex])]: { width: (100 * (i / 12)) + '%' },
                },
            });

            sheet.addCondition([abbrevs[sizeIndex]] + 'Push_' + i).addStyler({ [abbrevs[sizeIndex] + 'Push']: i });
            main.addSelector({
                condition: [[abbrevs[sizeIndex]] + 'Push_' + i],
                common: {
                    [Pod_Vars.get('grid_cell.' + sizes[sizeIndex])]: {
                        position: 'relative',
                        left: (100 * (i / 12)) + '%',
                    },
                },
            });

            sheet.addCondition([abbrevs[sizeIndex]] + 'Pull_' + i).addStyler({ [abbrevs[sizeIndex] + 'Pull']: i });
            main.addSelector({
                condition: [[abbrevs[sizeIndex]] + 'Pull_' + i],
                common: {
                    [Pod_Vars.get('grid_cell.' + sizes[sizeIndex])]: {
                        position: 'relative',
                        left: (-100 * (i / 12)) + '%',
                    },
                },
            });
        }
    }

    return sheet;
};
