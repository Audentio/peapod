import React from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import shallowCompare from 'react/lib/shallowCompare';

var Pod_Styler = require('../styler.jsx');

var Grid = require('./grid.jsx');
var Icon = require('./icon.jsx');

function isNodeInRoot(node, root) {
	while (node) {
		if (node === root) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}

var Pod_Portal = React.createClass({

	propTypes: {
		className: React.PropTypes.string,
		style: React.PropTypes.object,
		children: React.PropTypes.element.isRequired,
		trigger: React.PropTypes.element,
		closeOnEsc: React.PropTypes.bool,
		closeOnOutsideClick: React.PropTypes.bool,
		isOpened: React.PropTypes.bool,
		onOpen: React.PropTypes.func,
		onClose: React.PropTypes.func,
		beforeClose: React.PropTypes.func,
		noArrow: React.PropTypes.bool
	},


	getInitialState: function() {
		return {
			active: false
		}
	},

	componentDidMount: function() {
		if (this.props.closeOnEsc) {
			document.addEventListener('keydown', this.handleKeydown);
		}

		if (this.props.closeOnOutsideClick) {
			document.addEventListener('mousedown', this.handleOutsideMouseClick);
			document.addEventListener('touchstart', this.handleOutsideMouseClick);
		}

		if (this.props.isOpened) {
			this.openPortal(this.props);
		}
	},

	componentWillReceiveProps: function(newProps) {
		// portal's 'is open' state is handled through the prop isOpened
		if (typeof newProps.isOpened !== 'undefined') {
			if (newProps.isOpened) {
				if (this.state.active) {
					this.renderPortal(newProps);
				} else {
					this.openPortal(newProps);
				}
			}
			if (!newProps.isOpened && this.state.active) {
				this.closePortal();
			}
		}

		// portal handles its own 'is open' state
		if (typeof newProps.isOpened === 'undefined' && this.state.active) {
			this.renderPortal(newProps);
		}
	},

	componentWillUnmount: function() {
		if (this.props.closeOnEsc) {
			document.removeEventListener('keydown', this.handleKeydown);
		}

		if (this.props.closeOnOutsideClick) {
			document.removeEventListener('mousedown', this.handleOutsideMouseClick);
			document.removeEventListener('touchstart', this.handleOutsideMouseClick);
		}

		this.closePortal();
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	},

	renderPortal: function(props) {
		var trigger = this.trigger,
			styler = Pod_Styler.getStyle({props: {
				styler: {
					styleLike: 'Pod_portal'
				}
			}});

		if (!this.node) {
			this.node = document.createElement('div');

			if (props.className) {
				this.node.className = props.className;
			}

			this.node.style.visibility = 'hidden';
			this.node.style.position = 'absolute';

			var stylerProps = Object.keys(styler);
			for (var i = 0, len = stylerProps.length; i < len; i++) {
				var key = stylerProps[i];
				this.node.style[key] = styler[key];
			}

			document.body.appendChild(this.node);
		}
		this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(this, React.cloneElement(props.children, {closePortal: this.closePortal}), this.node);

		var triggerPos = trigger.getBoundingClientRect(),
		nodePos = this.node.getBoundingClientRect(),
		windowHeight = window.innerHeight,
		windowWidth = window.innerWidth,
		left = trigger.offsetLeft,
		top = trigger.offsetTop + trigger.offsetHeight;

		if ((triggerPos.bottom + nodePos.height) > windowHeight) {
			top = trigger.offsetTop - nodePos.height;
		}

		if (triggerPos.left + nodePos.width > windowWidth) {
			if (triggerPos.right - nodePos.width < 0) {
				left = 0
			} else {
				left = triggerPos.right - nodePos.width
			}
		}

		this.node.style.left = left + 'px';
		this.node.style.top = top + 'px';
		this.node.style.visibility = 'visible';
	},


	render: function() {
		if (this.props.trigger) {
			var arrowIcon = (this.state.active) ? 'arrow_drop_up' : 'arrow_drop_down';

			var arrow = (this.props.noArrow == true) ? '' : <Icon styler={{style: {fontSize: '$font.size.large'}}}>{arrowIcon}</Icon>

		return <div style={{display: 'inline-block'}} onClick={this.openPortal.bind(this, this.props)}>
				<Grid styler={{alignItems: 'center'}}>
					{this.props.trigger}
					{arrow}
				</Grid>
			</div>;
		} else {
			return <div>Specify a trigger...</div>;
		}
	},

	openPortal: function(props, e) {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}
		this.trigger = e.currentTarget;
		this.setState({active: true});
		this.renderPortal(props);
		if (this.props.onOpen) {
			this.props.onOpen(this.node);
		}
	},

	closePortal: function() {
		const resetPortalState = () => {
			if (this.node) {
				ReactDOM.unmountComponentAtNode(this.node);
				document.body.removeChild(this.node);
			}
			this.portal = null;
			this.node = null;
			this.setState({active: false});
		};

		if (this.props.beforeClose) {
			this.props.beforeClose(this.node, resetPortalState);
		} else {
			resetPortalState(this.node);
		}

		if (this.props.onClose) {
			this.props.onClose();
		}
	},

	handleOutsideMouseClick: function(e) {
		if (!this.state.active) { return; }
		if (isNodeInRoot(e.target, findDOMNode(this.portal)) || e.target.tagName === 'HTML') { return; }
		e.stopPropagation();
		this.closePortal();
	},

	handleKeydown: function(e) {
		// ESC
		if (e.keyCode === 27 && this.state.active) {
			this.closePortal();
		}
	},
})

module.exports = Pod_Portal;
