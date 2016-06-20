import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    // Conditions

    // Variables
    sheet.setValues({
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '$palette.grey200',
        padding: '$sitespcaing.medium',
    });


    main.addSelector({
        common: {
            borderBottomWidth: '$section.borderWidth',
            borderBottomStyle: '$section.borderStyle',
            borderBottomColor: '$section.borderColor',
            paddingTop(obj) {
                return obj.props.padding || '$section.padding';
            },
            paddingBottom(obj) {
                return obj.props.padding || '$section.padding';
            },
            fontFamily: '$font.family.primary',
        },
    });

    return sheet;
};
