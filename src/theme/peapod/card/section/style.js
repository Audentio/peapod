module.exports = function (sheet) {
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

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                paddingTop: theme.gutter.internal,
                paddingRight: theme.gutter.internal,
                paddingBottom: theme.gutter.internal,
                paddingLeft: theme.gutter.internal,
                clear: 'both',
                overflow: 'hidden',
                position: 'relative',
            },
        }).addSelector({
            condition: ['titleLarge'],
            common: {
                paddingTop: theme.gutter.small,
                paddingBottom: theme.gutter.small,
            },
        }).addSelector({
            condition: ['titleWithSupports'],
            common: {
                paddingTop: theme.gutter.small,
            },
        }).addSelector({
            condition: ['actionBar'],
            common: {
                paddingTop: theme.gutter.extrasmall,
                paddingRight: theme.gutter.extrasmall,
                paddingBottom: theme.gutter.extrasmall,
                paddingLeft: theme.gutter.extrasmall,
            },
        }).addSelector({
            condition: ['supportingText'],
            common: {
                paddingTop: '0px',
            },
        }).addSelector({
            condition: ['media'],
            common: {
                marginTop: 0 - parseFloat(theme.gutter.extrasmall),
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
                width: theme.gutter.extralarge,

                clear: 'none',
                paddingTop: theme.gutter.extrasmall,
                paddingRight: theme.gutter.extrasmall,
                paddingBottom: theme.gutter.extrasmall,
                paddingLeft: theme.gutter.extrasmall,
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
    };

    return sheet;
};
