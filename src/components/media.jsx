/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import ReactaDOM from 'react-dom';

var Pod_Styler = require('../styler.js');
var Wrapper = require('../wrapper.jsx')

/**
* Media component
* @element Code
*/
class Media extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);

        var image = (this.props.image) ? (
            <Pod.block align={this.props.alignImage}>
                <Pod.photo src={this.props.image}/>
            </Pod.block>
        ) : '' ;

        var title = (this.props.title) ? (<Pod.heading kind="h4">{this.props.title}</Pod.heading>): '';

        return (
            <Pod.block style={style.main}>
                {image}
                <Pod.block>
                    {title}
                    <Pod.paragraph>
                        {this.props.children}
                    </Pod.paragraph>
                </Pod.block>
            </Pod.block>
        );

    }

};

Media.defaultProps = {
    title: false,
    image: false,
    alignImage: 'right'
};

module.exports = Wrapper(Media);
