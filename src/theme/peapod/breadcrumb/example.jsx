import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class BreadcrumbExample extends React.Component {

	shouldComponentUpdate = PureRender;

    render() {
        return (
            <div>
                <Pod.ContentWrap>
                    <Pod.Breadcrumb children={['Home', 'Forums', 'Subforums', 'Best way to handle these?']}></Pod.Breadcrumb>
                </Pod.ContentWrap>
            </div>
        );
    }

}
