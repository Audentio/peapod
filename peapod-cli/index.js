#!/usr/bin/env node

var peapod={}
    program = require('commander'),
    path = require('path'),
    fs = require('fs');

//Fn :: Get version
peapod.getVersion = function(){
    var packageFile = fs.readFileSync(process.cwd() + "/package.json").toString()
    return JSON.parse(packageFile).version
}

//Fn :: Get templates
//-- returns template with optional environment
peapod.getTemplate = function(name, env){
    var contents = fs.readFileSync(__dirname + "/templates/"+name).toString();

    if(env) {
        for(var toReplace in env) {
            var re = new RegExp(toReplace, "g");
            contents = contents.replace(re, env[toReplace])
        }
    }

    return contents;
}

//Action :: Create component
peapod.createComponent = function(name){
    var srcPath = process.cwd() + "/src/theme/peapod",

    //capitalize first letter
    componentName = name.charAt(0).toUpperCase() + name.slice(1);

    fs.access(srcPath, fs.F_OK, function(err) {
        if (!err) {

            var componentPath = srcPath+ "/" + componentName;

            //make component folder
            if(!fs.existsSync(componentPath)){
                fs.mkdirSync(componentPath);
            }

            //grab templates
            var componentTemplate = peapod.getTemplate("component", {"{{%name%}}": componentName}),
                styleTemplate = peapod.getTemplate("component_style", {"{{%name%}}": componentName});

            //write <component>/component.jsx
            fs.writeFile(componentPath + "/component.jsx", componentTemplate, function(err) {
                if(err)
                    return console.log("Could not create "+componentPath+"component.jsx \n ~ "+err);

                console.log(componentPath+"/component.jsx created!");
            });

            //write <component>/style.js
            fs.writeFile(componentPath+"/style.js", styleTemplate, function(err) {
                if(err)
                    return console.log("Could not create "+componentPath+"style.js \n ~ "+err);

                console.log(componentPath+"/style.js created!");
            });
        }
        else {
            console.log("Couldn't find \"src\" folder. Please make sure your working dir is peapod root \n ~ "+err)
        }
    });
}

//CLI logic

if (!process.argv.slice(2).length) {
    console.log('--help for more information')
}

program.on('version', function(){
    console.log(peapod.getVersion())
})

program
.command('create')
.arguments('<name>')
.action(peapod.createComponent);


program.parse(process.argv);
