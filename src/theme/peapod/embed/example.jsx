import React from 'react';
import Pod from 'components.js';

module.exports = class EmbedExample extends React.Component {

    render() {
        return (
            <div>
                <Pod.ContentWrap>
                    <Pod.Lazy height="480px" distance="50">
                        <Pod.Embed width="100%" height="480px" src="https://www.youtube.com/embed/QhUzmR8eZAo" />
                    </Pod.Lazy>
                </Pod.ContentWrap>
            </div>
        );
    }

}
