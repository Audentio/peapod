import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const mediaTitle = sheet.addPart('mediaTitle');

    // Conditions
    sheet.addCondition('titleLarge').addStyler({ kind: 'title-large' });
    sheet.addCondition('titleSmall').addStyler({ kind: 'title-small' });
    sheet.addCondition('titleWithSupports').addStyler({ kind: 'title-supports' });
    sheet.addCondition('actionBar').addStyler({ kind: 'action-bar' });
    sheet.addCondition('supportingText').addStyler({ kind: 'supporting-text' });
    sheet.addCondition('mediaSection').addStyler({ kind: 'media-section' });
    sheet.addCondition('mediaAreaIcons').addStyler({ kind: 'media-area-icons' });
    sheet.addCondition('mediaArea').addStyler({ kind: 'media-area' });
    sheet.addCondition('media').addStyler({ kind: 'media' });

    sheet.addCondition('alignRight').addStyler({ align: 'right' });
    sheet.addCondition('floatRight').addStyler({ float: 'right' });
    sheet.addCondition('left').addStyler({ align: 'left' });

    sheet.addCondition('light').addStyler({ mediaSection: 'light' });

    // Variables
    sheet.setValues({});

    main.addSelector({
        common: {
            paddingTop: '$gutter.internal',
            paddingRight: '$gutter.internal',
            paddingBottom: '$gutter.internal',
            paddingLeft: '$gutter.internal',
            clear: 'both',
            overflow: 'hidden',
            position: 'relative',
        },
    }).addSelector({
        condition: ['titleLarge'],
        common: {
            paddingTop: '$gutter.small',
            paddingBottom: '$gutter.small',
        },
    }).addSelector({
        condition: ['titleWithSupports'],
        common: {
            paddingTop: '$gutter.small',
        },
    }).addSelector({
        condition: ['actionBar'],
        common: {
            paddingTop: '$gutter.extrasmall',
            paddingRight: '$gutter.extrasmall',
            paddingBottom: '$gutter.extrasmall',
            paddingLeft: '$gutter.extrasmall',
        },
    }).addSelector({
        condition: ['supportingText'],
        common: {
            paddingTop: '0px',
        },
    }).addSelector({
        condition: ['media'],
        common: {
            marginTop: 0 - parseFloat(Pod_Vars.get('gutter.extrasmall')),

            paddingTop: '0px',
            paddingRight: '0px',
            paddingBottom: '0px',
            paddingLeft: '0px',
        },
    }).addSelector({
        condition: ['mediaSection'],
        common: {
            marginTop: '0px',

            paddingTop: '0px',
            paddingRight: '0px',
            paddingBottom: '0px',
            paddingLeft: '0px',
        },
    }).addSelector({
        condition: ['mediaAreaIcons'],
        common: {
            marginTop: '0px',
            float: 'right',
            width: '$gutter.extralarge',

            clear: 'none',
            paddingTop: '$gutter.extrasmall',
            paddingRight: '$gutter.extrasmall',
            paddingBottom: '$gutter.extrasmall',
            paddingLeft: '$gutter.extrasmall',
        },
    }).addSelector({
        condition: ['mediaArea'],
        common: {
            float: 'left',
            maxWidth: 'calc(100% - 56px)',
            paddingTop: '0px',
            paddingRight: '0px',
            paddingBottom: '0px',
            paddingLeft: '0px',
            clear: 'none',
        },
    }).addSelector({
        condition: ['alignRight'],
        common: {
            textAlign: 'right',
        },
    }).addSelector({
        condition: ['floatRight'],
        common: {
            float: 'right',
        },
    });

    mediaTitle.addSelector({
        common: {
            position: 'absolute',
            bottom: '0px',
            left: '0px',
            background: 'rgba(0,0,0,.4)',
            color: 'white',
            width: '100%',
        },
    }).addSelector({
        condition: ['light'],
        common: {
            background: 'rgba(255,255,255,.4)',
            color: 'black',
        },
    });

    return sheet;
};
