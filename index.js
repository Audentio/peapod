
var Vars = require('./dist/vars.js')
var Styler = require('./dist/styler.js')
var Components = require('./dist/components.js')

exports.vars = Vars;
exports.styler = Styler;
exports.components = Components;
exports.test = function() {
  console.log("This is a test message from the Peapod package");
}
