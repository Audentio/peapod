// MyPlugin.js

var fs = require('fs');
var path = require('path');

function MyPlugin(options) {
    // Configure your plugin with options...
}

function recursiveReaddirSync(dir) {
    var list = [];
    var files = fs.readdirSync(dir);
    var stats;

    files.forEach(function (file) {
        stats = fs.lstatSync(path.join(dir, file));
        if(stats.isDirectory()) {
            list = list.concat(recursiveReaddirSync(path.join(dir, file)));
        } else {
            list.push(path.join(dir, file));
        }
    });

    return list;
}

function compileExports(themeName, includeExamples) {
    var themeBase = path.resolve(__dirname + '/../src/theme/' + themeName);
    var utilityBase = path.resolve(__dirname + '/../src/utility');

    var themeFiles = recursiveReaddirSync(themeBase);

    var componentExports = '';
    var components = {};

    for (var themeFileIndex = 0, themeFileLen = themeFiles.length; themeFileIndex < themeFileLen; themeFileIndex++) {
        var themeFile = themeFiles[themeFileIndex];
        var themeFileSplit = themeFile.split('/');
        var fileName = themeFileSplit[themeFileSplit.length - 1];

        if (fileName === 'style.js' || fileName === 'component.jsx' || (fileName === 'example.jsx' && includeExamples)) {
            var nameStartIndex = -1;
            for (var i = 0, len = themeFileSplit.length; i < len; i++) {
                if (themeFileSplit[i] === themeName) {
                    nameStartIndex = i;
                }
            }
            if (nameStartIndex >= 0) {
                var componentName = "";
                var componentPath = "";
                var ignoreComponent = false;

                for (var i = nameStartIndex + 1, len = themeFileSplit.length - 1; i < len; i++) {
                    var currentFolder = themeFileSplit[i];

                    if (currentFolder.indexOf('_') === -1) {
                        var currentFolderPascal = themeFileSplit[i];
                        if (currentFolder.length === 1) {
                            currentFolderPascal = currentFolder.charAt(0).toUpperCase();
                        } else {
                            currentFolderPascal = currentFolder.charAt(0).toUpperCase() + currentFolder.slice(1);
                        }

                        if (componentName == "") {
                            componentName = currentFolderPascal;
                        } else {
                            componentName += '_' + currentFolderPascal;
                        }

                        componentPath += '/' + currentFolder;
                    } else {
                        ignoreComponent = true;
                        break;
                    }
                }

                if (!ignoreComponent) {
                    if (typeof(components[componentName]) === 'undefined') {
                        components[componentName] = {
                            hasComponent: false,
                            hasStyle: false,
                            hasExample: false,
                            filePath: themeBase + componentPath,
                        };
                    }

                    if (fileName === 'component.jsx') {
                        components[componentName].hasComponent = true;
                    }

                    if (fileName === 'style.js') {
                        components[componentName].hasStyle = true;
                    }

                    if (fileName === 'example.jsx') {
                        components[componentName].hasExample = true;
                    }
                }
            }
        }
    }

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

        if (component.hasComponent) {
            componentIndex += 'import unwrappedComponent from \'./component.jsx\';\n';
            componentIndex += 'const wrappedComponent = wrapper(unwrappedComponent(\'' + componentKey + '\'));\n\n'

            if (componentExport !== '') {
                componentExport += ', ';
            }
            componentExport += 'wrappedComponent as default';
        }

        if (component.hasExample) {
            componentIndex += 'import example from \'./example.jsx\';\n\n';

            if (componentExport !== '') {
                componentExport += ', ';
            }
            componentExport += 'example as example';
        }

        if (component.hasStyle) {
            componentIndex += 'import style from \'./style.js\';\n\n';

            if (componentExport !== '') {
                componentExport += ', ';
            }
            componentExport += 'style as style';
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

    var componentExportsOld = fs.readFileSync(utilityBase + '/components.js');
    if (componentExportsOld != componentExports) {
        fs.writeFileSync(utilityBase + '/components.js', componentExports);
        console.log('wrote updated compontents file');
    }
}

MyPlugin.prototype.apply = function(compiler) {
    compiler.plugin("compile", function(params) {
        console.log("The compiler is starting to compile...");

        compileExports('peapod', true);
    });

    compiler.plugin("compilation", function(compilation) {
        console.log("The compiler is starting a new compilation...");

        compilation.plugin("optimize", function() {
            console.log("The compilation is starting to optimize files...");
        });

        compilation.plugin('optimize-chunks', function(chunks) {
            //unless you specified multiple entries in your config
            //there's only one chunk at this point
            chunks.forEach(function (chunk) {
                //chunks have circular references to their modules
            });
        });
    });

    compiler.plugin("emit", function(compilation, callback) {
        console.log("The compilation is going to emit files...");
        callback();
    });
};

module.exports = MyPlugin;
