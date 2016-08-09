const components = require('./src/utility/components.js');

const componentKeys = Object.keys(components);
for (let i = 0, len = componentKeys.length; i < len; i++) {
    const componentName = componentKeys[i];
    console.log(componentName);
}
