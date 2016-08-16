// MyPlugin.js

var compileExports = require('./peapod.js');

function MyPlugin(options) {
    // Configure your plugin with options...
}

MyPlugin.prototype.apply = function(compiler) {
    compiler.plugin("compile", function(params) {
        //console.log("The compiler is starting to compile...");

        compileExports('peapod', true);
    });

    compiler.plugin("compilation", function(compilation) {
        //console.log("The compiler is starting a new compilation...");

        compilation.plugin("optimize", function() {
            //console.log("The compilation is starting to optimize files...");
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
        //console.log("The compilation is going to emit files...");
        callback();
    });
};

module.exports = MyPlugin;
