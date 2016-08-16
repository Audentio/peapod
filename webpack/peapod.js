
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
            themePath: themePath,
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

        console.log(components);

        const componentKeys = Object.keys(components);

        for (let componentIndex = 0, componentLen = componentKeys.length; componentIndex < componentLen; componentIndex++) {
            const componentKey = componentKeys[componentIndex];
            const component = components[componentKey];
            const compiledPath = path.resolve(__dirname + '/../src/compiled' + component.compiledPath);

            let componentExports = '';

            ensureDirectoryExistence(compiledPath + '/component_compiled.jsx');

            fs.writeFileSync(compiledPath + '/component_compiled.jsx', componentExports, {flag: 'w+'});
        }

        /*

        var componentExports = '';

        var componentKeys = Object.keys(components);
        for (var i = 0, len = componentKeys.length; i < len; i++) {
        var componentKey = componentKeys[i];
        var component = components[componentKey];
        var indexPath = component.filePath + '/index.js';
        componentExports += 'export ' + componentKey + ' from \'' + indexPath + '\';\n';

        var componentIndex = '';
        var componentExport = '';

        if (component.hasExample || component.hasComponent) {
        componentIndex += 'import wrapper from \'utility/wrapper.jsx\';\n';
        }

        if (component.hasExample) {
        componentExports += 'export ' + componentKey + '_Example from \'' + component.filePath + '/example.jsx\';\n';
        }

        if (component.hasComponent) {
        componentIndex += 'import unwrappedComponent from \'./component.jsx\';\n';
        componentIndex += 'const wrappedComponent = wrapper(unwrappedComponent(\'' + componentKey + '\'));\n\n'

        if (componentExport !== '') {
        componentExport += ', ';
        }
        componentExport += 'wrappedComponent as default';
        }

        componentIndex += 'export { ' + componentExport + ' };\n';



        if (fs.exists(indexPath)) {
        var componentIndexOld = fs.readFileSync(indexPath);
        } else {
        var componentIndexOld = null;
        }

        if (componentIndex !== componentIndexOld) {
        fs.writeFileSync(indexPath, componentIndex);
        }

        }

        componentExports += 'import Styler from \'' + utilityBase + '/styler.js\';\n';
        componentExports += 'window.Styler = window.Styler || Styler;\n';
        componentExports += 'import theme from \'' + themePath + '/theme.js\';\n'
        componentExports += 'window.Styler.addLibrary(\'root\', \'peapod\', {}, null, theme.sheet);\n';

        var componentExportsOld = fs.readFileSync(utilityBase + '/components.js');
        if (componentExportsOld != componentExports) {
        fs.writeFileSync(utilityBase + '/components.js', componentExports);
        console.log('wrote updated compontents file');
        }
        */
    }
}


module.exports = compileExports;
