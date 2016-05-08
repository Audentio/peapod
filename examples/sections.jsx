import React from 'react'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

var components = []
var req = require.context('./sectionComponents', false, /^\.\/.*\.jsx$/),
    fileNames = req.keys();

for (var i = 0, len = fileNames.length; i < len; i++) {
    var fileName = fileNames[i].replace('./', '').replace('.jsx', ''),
        componentName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
        componentName = componentName+'Section'

        window[componentName] = req('./' + fileName + '.jsx').default;
        components.push(React.createElement(window[componentName], null));
}


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
                {components}
            </div>
        )
    }
}

export default Sections
