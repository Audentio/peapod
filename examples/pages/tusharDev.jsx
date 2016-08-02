import React from 'react';
import Pod from 'utility/components.js';

export default class KylerDev extends React.Component {
    render() {
        return (<div>
            <Pod.Video src="../media/sample_long.mp4" poster="../media/sample_poster.png" />
            <Pod.Video src="../media/sample_long.mp4" poster="../media/sample_poster.png" />
        </div>);
    }

}
