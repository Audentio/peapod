/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Styler from 'utility/styler.js';
import Pod_Helper from 'utility/helper.js';
import { Progress } from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    constructor(props, context) {
        super(props, context);

        this.submit = this.submit.bind(this);

        this.state = {
            fields: this.props.children,
            disabled: false,
        };
    }

    static propTypes = {
        action: React.PropTypes.string.isRequired,
        autoPopulate: React.PropTypes.bool,
        children: React.PropTypes.node,
        fetch: React.PropTypes.string,
        method: React.PropTypes.string,
        renderSubmit: React.PropTypes.bool,
    }

    static defaultProps = {
        method: 'GET',
        renderSubmit: false,
    }

    submit(ev) {
        const _this = this;
        const form = _this.refs.form;
        const formData = {};

        // get formData
        for (let i = 0; i < form.elements.length; i++) {
            const e = form.elements[i];
            if (e.type !== 'submit') formData[e.name] = e.value;
        }

        const xhr_data = encodeURIComponent(JSON.stringify(formData));

        const xhr_config = {
            cache: false,
            url: this.props.action,
            method: this.props.method,
            data: `json_data=${xhr_data}`,
        };

        const callback = _this.props.callback;

        if (typeof callback === 'object') {
            if (callback.progress) xhr_config.progress = (progress, e) => callback.progress(progress, e);

            if (callback.success) xhr_config.success = (response, status) => callback.success(response, status);

            if (callback.error) xhr_config.error = (response, status) => callback.error(response, status);

            if (callback.complete) xhr_config.complete = (response, status) => callback.complete(response, status);
        } else if (typeof callback === 'function') {
            xhr_config.complete = (response, status) => callback(response, status);
        }

        Pod_Helper.xhr(xhr_config);

        ev.preventDefault();
    }

    // Make form inaccessible
    loading_start() {
        this.setState({
            disabled: true,
        });
    }

    // Make form accesible
    loading_stop() {
        this.setState({
            disabled: false,
        });
    }

    populate(source) {
        const _this = this;

        _this.loading_start();

        Pod_Helper.xhr({
            cache: false,
            url: source,
            method: 'GET',
            complete: () => {
                _this.loading_stop();
            },
            progress: (progress) => {
                _this.setState({
                    downloadProgress: progress,
                });
            },
            success: (res) => {
                _this.setState({
                    downloadProgress: null,
                });

                let data;

                try {
                    data = JSON.parse(res);
                } catch (e) {
                    // no bueno
                    // console.error(`[Form] Unable to parse response. Please check endpoint ${source}`);
                    return;
                }

                // Update child input values
                _this.setState({
                    fields: React.Children.map(_this.props.children, child => {
                        if (child.props && child.props.name && data.hasOwnProperty(child.props.name)) {
                            return React.cloneElement(child, {
                                value: data[child.props.name],
                            });
                        }
                        return child;
                    }),
                });
            },
            error: () => {
                // console.error('Failed to fetch data. Please try reloading');
            },
        });
    }

    componentDidMount() {
        if (this.props.fetch) this.populate(this.props.fetch);
    }

    render() {
        const classes = Styler.getClasses(this);
        const hasDownloadProgress = (this.state.downloadProgress !== null) && !isNaN(this.state.downloadProgress);

        return (
            <form className={classes.form} ref="form" method={this.props.method} action={this.props.action} onSubmit={this.submit}>
                <div className={classes.main}>
                    {this.state.fields}
                    {this.props.renderSubmit && <input type="submit" className={classes.submit} />}
                </div>
                <div className={classes.overlay}>
                    {hasDownloadProgress && <Progress value={this.state.downloadProgress} />}
                </div>
            </form>
        );
    }
};
