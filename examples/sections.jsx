import React from 'react'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'


var firstComponents = ['HeroSection', 'FixedSection']

var components = []
var req = require.context('./sectionComponents', false, /^\.\/.*\.jsx$/),
    fileNames = req.keys();

for (var i = 0, len = fileNames.length; i < len; i++) {
    var fileName = fileNames[i].replace('./', '').replace('.jsx', ''),
        componentName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
        componentName = componentName+'Section'

        window[componentName] = req('./' + fileName + '.jsx').default;
        components.push(componentName);
}

var componentsOutput = []
components.unshift(...firstComponents)
for (var i = 0; i<components.length; i++) {
    componentsOutput.push(React.createElement(window[components[i]], null))
}
// React.createElement(window[componentName], null)


console.log(components, componentsOutput)




// var lazyload = (
// <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
// <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
// <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
// <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
// <Pod.photo src="mrRobot.jpg" lazy={true} caption="Lazy load!" hidpiData={false} />
// )

class Sections extends React.Component {
    render () {
        return (
            <div>
                {componentsOutput}
            </div>
        )
    }
}

export default Sections
