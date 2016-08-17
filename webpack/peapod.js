
const fs = require('fs');
const path = require('path');

function recursiveReadDirSync(dir) {
    let list = [];
    const files = fs.readdirSync(dir);
    let stats;

    files.forEach(function (file) {
        stats = fs.lstatSync(path.join(dir, file));
        if (stats.isDirectory()) {
            list = list.concat(recursiveReadDirSync(path.join(dir, file)));
        } else {
            list.push(path.join(dir, file));
        }
    });

    return list;
}

function directoryExists(dirPath) {
    try {
        return fs.statSync(dirPath).isDirectory();
    } catch (err) {
        return false;
    }
}

function ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    if (directoryExists(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

function compileExports(themePaths, includeExamples) {
    themePaths = [{
        path: path.resolve(__dirname + '/../src/theme/peapod'),
        name: 'peapod',
    }];

    const utilityPath = path.resolve(__dirname + '/../src/utility');
    const components = {};
    const themes = [];

    for (let themeIndex = themePaths.length - 1; themeIndex >= 0; themeIndex--) {
        const themePath = themePaths[themeIndex].path;
        const themeName = themePaths[themeIndex].name;

        themes.push({
            name: themeName,
            themePath,
        });

        const themeFiles = recursiveReadDirSync(themePath);

        for (let themeFileIndex = 0, themeFileLen = themeFiles.length; themeFileIndex < themeFileLen; themeFileIndex++) {
            const themeFile = themeFiles[themeFileIndex];
            const themeFileSplit = themeFile.split('/');
            const fileName = themeFileSplit[themeFileSplit.length - 1];

            if (fileName === 'style.js' || fileName === 'component.jsx' || (fileName === 'example.jsx' && includeExamples)) {
                let nameStartIndex = -1;
                for (let i = 0, len = themeFileSplit.length; i < len; i++) {
                    if (themeFileSplit[i] === themeName) {
                        nameStartIndex = i;
                    }
                }
                if (nameStartIndex >= 0) {
                    let componentName = '';
                    let compiledPath = '';
                    let ignoreComponent = false;

                    for (let i = nameStartIndex + 1, len = themeFileSplit.length - 1; i < len; i++) {
                        const currentFolder = themeFileSplit[i];
                        if (currentFolder.indexOf('_') === -1) {
                            let currentFolderPascal = themeFileSplit[i];
                            if (currentFolder.length === 1) {
                                currentFolderPascal = currentFolder.charAt(0).toUpperCase();
                            } else {
                                currentFolderPascal = currentFolder.charAt(0).toUpperCase() + currentFolder.slice(1);
                            }

                            if (componentName === '') {
                                componentName = currentFolderPascal;
                            } else {
                                componentName += '_' + currentFolderPascal;
                            }

                            compiledPath += '/' + currentFolder;
                        } else {
                            ignoreComponent = true;
                            break;
                        }
                    }

                    if (!ignoreComponent) {
                        if (typeof(components[componentName]) === 'undefined') {
                            components[componentName] = {
                                componentPath: '',
                                stylePaths: [],
                                examplePath: '',
                                compiledPath,
                            };
                        }

                        if (fileName === 'component.jsx') {
                            components[componentName].componentPath = themeFile;
                        }

                        if (fileName === 'example.jsx') {
                            components[componentName].examplePath = themeFile;
                        }

                        if (fileName === 'style.js') {
                            components[componentName].stylePaths.push(themeFile);
                        }
                    }
                }
            }
        }

        const componentKeys = Object.keys(components);

        let componentUtilityExport = '';

        for (let componentIndex = 0, componentLen = componentKeys.length; componentIndex < componentLen; componentIndex++) {
            const componentKey = componentKeys[componentIndex];
            const component = components[componentKey];
            const compiledPath = path.resolve(__dirname + '/../src/compiled' + component.compiledPath);

            ensureDirectoryExistence(compiledPath + '/component_compiled.jsx'); // make the folder for the component if needed

            let componentExports = `const componentName = '${componentKey}';
import { Sheet } from 'utility/stylesheet.js';
let themesheet = new Sheet('peapod');
let stylesheet = new Sheet(componentName);\n\n`;

            for (let themeVarIndex = 0, themeVarLen = themes.length; themeVarIndex < themeVarLen; themeVarIndex++) {
                componentExports += `import theme_${themeVarIndex} from '${themes[themeVarIndex].themePath}/theme.js';
themesheet = theme_${themeVarIndex}(themesheet);\n\n`;
            }


            for (let styleIndex = 0, styleLen = component.stylePaths.length; styleIndex < styleLen; styleIndex++) {
                componentExports += `import sheet_${styleIndex} from '${component.stylePaths[styleIndex]}';
stylesheet = sheet_${styleIndex}(stylesheet);\n\n`;
            }

            componentExports += `import wrapper from 'utility/wrapper.jsx';

import sourceComponent from '${component.componentPath}';

let component = null;

if (typeof(sourceComponent) === 'function') {
    component = wrapper(sourceComponent(componentName), stylesheet, themesheet);
    if (typeof(component) === 'undefined') {
        throw new Error(componentName + ' is not returning or is returning undefined');
    }
    if (component.displayName !== componentName) {
        throw new Error(componentName + ' is not setting the component name correctly');
    }
} else {
    throw new Error(componentName + ' is not a function');
}

export default component;`;
            fs.writeFileSync(compiledPath + '/component_compiled.jsx', componentExports, {flag: 'w+'});

            if (component.examplePath !== '') {
                let exampleExports = '';
                fs.writeFileSync(compiledPath + '/example_compiled.jsx', exampleExports, {flag: 'w+'});
            }

            componentUtilityExport += `export ${componentKey} from '${compiledPath}/component_compiled.jsx';\n`;

        }

        fs.writeFileSync(utilityPath + '/components.js', componentUtilityExport, {flag: 'w+'});
    }
}


module.exports = compileExports;
