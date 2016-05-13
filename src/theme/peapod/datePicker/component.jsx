import React from 'react';
var Pod_Styler = require('styler.js');
import {Input, Portal, Calendar, Card} from 'components.js'

/**
* DatePicker component
* @element Code
*/
module.exports = class DatePicker extends React.Component {

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
        date = new Date(date);
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
        console.log(value)
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
        console.log(this.state.value)
        var trigger = (
            <div>
                <Input onFocus={this.onFocus} callback={this.onChange} type='date' value={this.props.value} />
                {this.props.children}
            </div>
        );

        return (
            <Portal
                trigger={trigger}
                // closeOnOutsideClick={true} add remove to the calendar instead.
                noArrow={true}
            >
                <div style={style.main}>
                    <div style={style.calendar}>
                        <Card>
                            <Calendar
                                date={this.state.day}
                                month={this.state.month}
                                year={this.state.year}
                                onClick={this.onChange}
                            />
                        </Card>
                    </div>
                </div>
            </Portal>
        );

    }

};
