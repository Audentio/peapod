const Sheet = require('./dist/sheet.js');
const Pod_Styler = require('./dist/styler.js');
const Pod_Vars = require('./dist/vars.js');


module.exports = {
    Sheet: Sheet.Sheet,
    Pod_Styler,
    Pod_Vars,
};

const components = require('./dist/components.js');

const componentKeys = Object.keys(components);
for (let i = 0, len = componentKeys.length; i < len; i++) {
    const componentName = componentKeys[i];
    module.exports[componentName] = components[componentName];
}
