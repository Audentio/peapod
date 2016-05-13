const Sheet = require('./dist/sheet.js');

module.exports = {
    Sheet: Sheet.Sheet,
};

const components = require('./dist/components.js');

const componentKeys = Object.keys(components);
for (let i = 0, len = componentKeys.length; i < len; i++) {
    const componentName = componentKeys[i];
    module.exports[componentName] = components[componentName];
}
