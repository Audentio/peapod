import React from 'react';
import Styler from 'utility/styler.js';
import { Input, Portal, Calendar, Card, Button } from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        date: React.PropTypes.any,
        name: React.PropTypes.any,
        onChange: React.PropTypes.func,
        children: React.PropTypes.any,
    }

    componentWillMount() {
        const date = (this.props.date) ? new Date(this.props.date) :
        new Date();

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
        event.nativeEvent.target.blur();
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
        if (this.props.onChange) this.props.onChange({ value }, this.props.name);
    }

    render() {
        const classes = Styler.getClasses(this);
        const trigger = (
            <div>
                <Button styler={{ kind: 'primary' }}>
                    <Input styler={{ style: { border: 'none', color: 'white', minWidth: 0, pointerEvents: 'none' } }} onFocus={this.onFocus} name={this.props.name} callback={this.onChange} type="date" value={this.state.value} />
                </Button>
                {this.props.children}
            </div>
        );

        return (
            <Portal
                trigger={trigger}
                closeOnOutsideClick
                noArrow
            >
                <div className={classes.main}>
                    <div className={classes.calendar}>
                        <Card styler={{ style: classes.style.card }}>
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
