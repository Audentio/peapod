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

        var date= new Date();
        this.state = {
            date,
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            value: 0
        }

        this.onFocus = this.onFocus.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    componentWillMount() {
        var value = this.dateValue(this.state.date);
        this.setState({value})
    }

    dateValue(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        return year + '-' + ("0" + month).slice(-2) + '-' + ("0" + day).slice(-2);

    }

    onFocus(event) {
        event.preventDefault();
        event.targetElem.blur();
        return false;
    }

    onChange(date) {
        date = new Date(date)
        var value = this.dateValue(date);
        this.setState({
            value,
            date,
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        });
    }

    render() {
        var style = Pod_Styler.getStyle(this);

        var trigger = (
            <div>
                <Pod.input onFocus={this.onFocus} callback={this.onChange} type='date' value={this.state.value} />
                {this.props.children}
            </div>
        );

        return (
            <Pod.portal
                trigger={trigger}
                closeOnOutsideClick={true}
                closeOnEsc={true}
                noArrow={true}
            >
                <div style={style.main}>
                    <div style={style.calendar}>
                        <Pod.calendar
                        date={this.state.day}
                        month={this.state.month}
                        year={this.state.year}
                        onClick={this.onChange}
                        />
                    </div>
                </div>
            </Pod.portal>
        );

    }

};

module.exports = Wrapper(Datepicker);
