import React from 'react';
import { Pane } from 'components.js';


var firstComponents = ['HeroSection', 'FixedSection', 'ParallaxSection'];

var components = [];
var req = require.context('./sectionComponents', false, /^\.\/.*\.jsx$/),
    fileNames = req.keys();

for (var i = 0, len = fileNames.length; i < len; i++) {
    var fileName = fileNames[i].replace('./', '').replace('.jsx', ''),
        componentName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
    componentName = componentName + 'Section';

    window[componentName] = req('./' + fileName + '.jsx').default;
    components.push(componentName);
}

var componentsOutput = [];
components.unshift(...firstComponents);
for (var i = 0; i < components.length; i++) {
    componentsOutput.push(React.createElement(window[components[i]], { key: 'section' + i }));
}
// React.createElement(window[componentName], null)


class Sections extends React.Component {
    render() {
        return (
            <div>
                <Pane>
                    {componentsOutput}
                </Pane>
            </div>
        );
    }
}

export default Sections;
