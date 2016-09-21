import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheet) {
    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {});

        sheet.selector('.trigger', {
            cursor: 'pointer',
        });
    };   

    return sheet;
};
