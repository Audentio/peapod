/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

var Pod_Styler = require('../styler.js');
var Wrapper = require('../wrapper.jsx')

/**
* Datepicker component
* @element Code
*/
class Datepicker extends React.Component {

    constructor() {
        super();

        this.state = {
            date: new Date()
        }

        this.onFocus = this.onFocus.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    dateValue() {
        var date = this.state.date;
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var newDate = year + '-' + ("0" + month).slice(-2) + '-' + ("0" + day).slice(-2);

        return newDate;
    }

    onFocus(event) {
        event.preventDefault();
        event.targetElem.blur();
        return false;
    }

    onChange(date) {
        console.log(new Date(date))
    }

    render() {
        var style = Pod_Styler.getStyle(this);

        var trigger = (
            <div>
                <Pod.input onFocus={this.onFocus} callback={this.onChange} type='date' value={this.dateValue()} />
                {this.props.children}
            </div>
        );

        return (
            <Pod.portal
                trigger={trigger}
                // closeOnOutsideClick={true} add remove to the calendar instead.
                noArrow={true}
            >
                <div style={style.main}>
                    <div style={style.calendar}>
                        Datepicker goes here
                    </div>
                </div>
            </Pod.portal>
        );

    }

};

module.exports = Wrapper(Datepicker);
