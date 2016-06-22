import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();

    main.addSelector({
        common: {
            marginBottom(obj) {
                return obj.props.margin || '$sitespcaing.medium';
            },
        },
    });

    return sheet;
};
