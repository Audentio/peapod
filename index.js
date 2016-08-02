// const Sheet = require('./dist/sheet.js');
// const Pod_Styler = require('./dist/styler.js');
// const Pod_Helper = require('./dist/helper.js');
// const Pod_Vars = require('./dist/vars.js');


// module.exports = {
//     Sheet: Sheet.Sheet,
//     Pod_Styler,
//     Pod_Vars,
//     Pod_Helper,
// };

// const components = require('./dist/components.js');

// const componentKeys = Object.keys(components);
// for (let i = 0, len = componentKeys.length; i < len; i++) {
//     const componentName = componentKeys[i];
//     module.exports[componentName] = components[componentName];
// }
const Sheet = require('src/utility/stylesheet.js');
const Pod_Styler = require('src/utility/styler.js');
const Pod_Helper = require('src/utility/helper.js');
const Pod_Vars = require('src/utility/vars.js');


module.exports = {
    Sheet: Sheet.Sheet,
    Pod_Styler,
    Pod_Vars,
    Pod_Helper,
};

const components = require('src/utility/components.js');

const componentKeys = Object.keys(components);
for (let i = 0, len = componentKeys.length; i < len; i++) {
    const componentName = componentKeys[i];
    module.exports[componentName] = components[componentName];
}
