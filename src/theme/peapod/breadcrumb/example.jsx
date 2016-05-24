import React from 'react';
import Pod from 'utility/components.js';

module.exports = class BreadcrumbExample extends React.Component {

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
