// MyPlugin.js

function MyPlugin(options) {
    // Configure your plugin with options...
}

MyPlugin.prototype.apply = function(compiler) {
    compiler.plugin("compile", function(params) {
        console.log("The compiler is starting to compile...");
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
                chunk.modules.forEach(function (module){
                    //module.loaders, module.rawRequest, module.dependencies, etc.
                    var dependencies = module.dependencies;
                    //console.log(module.rawRequest);
                    //console.log(module.usedExports);
                    //console.log('======')
                    if (module.rawRequest == 'utility/components.js') {
                        //console.log(module);
                        for (var i = 0, len = dependencies.length; i < len; i++) {
                            var dependency = dependencies[i];
                            if (dependency.request == 'utility/components.js') {
                                //console.log(dependency)
                            }
                        }
                    }
                });
            });
        });
    });

    compiler.plugin("emit", function(compilation, callback) {
        console.log("The compilation is going to emit files...");
        callback();
    });
};

module.exports = MyPlugin;
