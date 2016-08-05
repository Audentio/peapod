/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Radium from 'radium';

import {merge as _merge} from 'lodash'

/**
* Animation wrapper: Add animation prop to components
*
*/

//Animations
var anim = {
    rotate:
    `
    ${Radium.keyframes({
        'from': {transform: 'rotate(0deg)'},
        'to': {transform: 'rotate(360deg)'},
    })} 1s linear 0s infinite
    `,

    rotate_acw:
    `
    ${Radium.keyframes({
        'from': {transform: 'rotate(0deg)'},
        'to': {transform: 'rotate(-360deg)'},
    })} 1s linear 0s infinite
    `,

    pulse:
    `
    ${Radium.keyframes({
        '0%': {transform: 'scale(1)'},
        '50%': {transform: 'scale(.8)'},
        '100%': {transform: 'scale(1)'}
    })} 1s ease 0s infinite
    `,

    bounce:
    `
    ${Radium.keyframes({
        '0%': {transform: 'translateY(0)'},
        '50%': {transform: 'translateY(-10px)'},
        '100%': {transform: 'translateY(0)'}
    })} 1s ease 0s infinite
    `
}

/* Animation wrapper function
*/

var Pod_animation = ComposedComponent => class extends React.Component {

    static displayName = `${ComposedComponent.displayName}_Animation`;

    componentWillMount() {

        if(this.props.animation){

            var animation = this.props.animation.split(','); //in case speed is also passed
            var animation_name = animation[0];
            var animation_speed = animation[1];

            this.animationName = animation_name;

            if(typeof anim[animation_name] == 'undefined')
            console.warn('Animation undefined:' + animation_name);

            //set animation speed if defined
            if(typeof animation_speed != 'undefined')
            this.animationSpeed = animation_speed
        }

    }

    render() {

        var {animation, ...props} = this.props; //this.props.animation wont be passed down
        var _style = _merge( {},
            {'animation': anim[this.animationName]},
            this.animationSpeed && {'animationDuration': this.animationSpeed},
            this.props.style
        )
        return <ComposedComponent {...props} style={_style} />;
    }

};

module.exports = function () { return Pod_animation; };
