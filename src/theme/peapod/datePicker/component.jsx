import React from 'react';
const Pod_Styler = require('styler.js');
import { Input, Portal, Calendar, Card } from 'components.js';

/**
* DatePicker component
* @element Code
*/
module.exports = class DatePicker extends React.Component {

    componentWillMount() {
        console.log(this.props.date);

        const date = (this.props.date) ? new Date(this.props.date) :
            new Date();

        // const date = new Date();
        this.state = {
            date,
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            value: 0,
        };

        this.onFocus = this.onFocus.bind(this);
        this.onChange = this.onChange.bind(this);

        const value = this.dateValue(this.state.date);
        this.setState({ value });
    }

    dateValue(date) {
        date = new Date(date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2);
    }

    onFocus(event) {
        event.preventDefault();
        event.targetElem.blur();
        return false;
    }

    onChange(date) {
        date = new Date(date);
        const value = this.dateValue(date);
        this.setState({
            value,
            date,
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
        });
    }
    render() {
        const style = Pod_Styler.getStyle(this);
        const trigger = (
            <div>
                <Input onFocus={this.onFocus} callback={this.onChange} type="date" value={this.state.value} />
                {this.props.children}
            </div>
        );

        return (
            <Portal
                trigger={trigger}
                closeOnOutsideClick 
                noArrow
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
