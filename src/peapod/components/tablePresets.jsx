/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import ReactDOM from 'react-dom';
var Pod_Styler = require('../styler.jsx');
var Wrapper = require('../wrapper.jsx')


var Button = require('./button.jsx');
var Portal = require('./portal.jsx')

var topButtonStyle = {
	display: 'inline-block',
	height: '2.5rem',
	lineHeight: '1.1rem',
	fontSize: '1.1rem',
	paddingLeft: '$gutter.small',
	paddingRight: '$gutter.small',
	margin: '$gutter.internal'
}

var TablePresets = React.createClass({
	getInitialState: function() {
		return {
			presets: this.props.presets
		}
	},

	checkPresetConditions: function(index) {
		var checked = false,
			preset = this.props.presets[index],
			queries = this.props.queries;

		if (typeof(preset.addQuery) !== 'undefined') {
			var checkedAll = true
			for (var i = 0, len = queries.length; i < len; i++) {
				var query = queries[i];
				var checkedAll = true
				for (var j = 0, len2 = preset.addQuery.length; j < len2; j++) {
					var presetVal = preset.addQuery[j];
					if (query.column == presetVal.column && query.comparison == presetVal.comparison && query.value == presetVal.value) {
						checkedAll = false;
					}
				}
			}
			if (checkedAll && len > 0 && len2 > 0) checked = true;
		}

		if (typeof(preset.removeQuery) !== 'undefined') {
			var checkedAll = true
			for (var i = 0, len = queries.length; i < len; i++) {
				var query = queries[i];
				for (var j = 0, len2 = preset.removeQuery.length; j < len2; j++) {
					var presetVal = preset.removeQuery[j];
					if (query.column == presetVal.column) {
						checkedAll = false;
					}
				}
			}
			if (checkedAll && len > 0 && len2 > 0) checked = true;
		}

		if (typeof(preset.addQueryOnePerColumn) !== 'undefined') {
			var checkedAll = true
			for (var i = 0, len = queries.length; i < len; i++) {
				var query = queries[i];
				var checkedAll = false
				for (var j = 0, len2 = preset.addQueryOnePerColumn.length; j < len2; j++) {
					var presetVal = preset.addQueryOnePerColumn[j];
					if (query.column == presetVal.column && query.comparison == presetVal.comparison && query.value == presetVal.value) {
						checkedAll = true;
					}
				}
			}
			if (checkedAll && len > 0 && len2 > 0) checked = true;
		}

		return checked;
	},

	render: function() {
		var style = Pod_Styler.getStyle(this);

		var presets = this.state.presets,
			queries = this.props.queries,
			addQuery = this.props.addQuery,
			removeQuery = this.props.removeQuery,
			addQueryOnePerColumn = this.props.addQueryOnePerColumn,
			presetButtons = presets.map(function(preset, index) {
				var onClick = function() {
					if (typeof(preset.addQuery) !== 'undefined') {
						for (var i = 0, len = preset.addQuery.length; i < len; i++) {
							var query = preset.addQuery[i];
							addQuery(query.column, query.comparison, query.value, query.display)
						}
					}

					if (typeof(preset.removeQuery) !== 'undefined') {
						for (var i = 0, len = preset.removeQuery.length; i < len; i++) {
							var query = preset.removeQuery[i];
							removeQuery(query.column)
						}
					}

					if (typeof(preset.addQueryOnePerColumn) !== 'undefined') {
						for (var i = 0, len = preset.addQueryOnePerColumn.length; i < len; i++) {
							var query = preset.addQueryOnePerColumn[i];
							addQueryOnePerColumn(query.column, query.comparison, query.value, query.display)
						}
					}
				}.bind(this);

				return (
					<Button key={'preset-' + index} styler={{
							kind: this.checkPresetConditions(index) == true ? 'primary' : 'base',
							round: true,
							style: topButtonStyle
					}}
					onClick={onClick} >{preset.label}</Button>
				)
			}.bind(this)),
			presetContainer = (window.innerWidth > 800) ? presetButtons : <Portal trigger={<div>Presets</div>}><div>{presetButtons}</div></Portal>;

		return (
			<div style={{display: 'inline-block'}}>
				{presetContainer}
			</div>
		);
	}
})

module.exports = Wrapper(TablePresets);
