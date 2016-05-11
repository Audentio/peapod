import ReactDOM, {findDOMNode} from 'react-dom';
import shallowCompare from 'react/lib/shallowCompare';

import React from 'react';
import Pod_Styler from 'styler.js';

import {Icon, Grid} from 'components.js';


function isNodeInRoot(node, root) {
	while (node) {
		if (node === root) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}

module.exports = class Portal extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			active: false
		}
	}

	static propTypes = {
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
	}

	componentDidMount() {
		if (this.props.closeOnEsc) {
			document.addEventListener('keydown', this.handleKeydown.bind(this));
		}

		if (this.props.closeOnOutsideClick) {
			document.addEventListener('mousedown', this.handleOutsideMouseClick.bind(this));
			document.addEventListener('touchstart', this.handleOutsideMouseClick.bind(this));
		}

		if (this.props.isOpened) {
			this.openPortal(this.props);
		}
	}

	componentWillReceiveProps(newProps) {
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
	}

	componentWillUnmount() {
		if (this.props.closeOnEsc) {
			document.removeEventListener('keydown', this.handleKeydown);
		}

		if (this.props.closeOnOutsideClick) {
			document.removeEventListener('mousedown', this.handleOutsideMouseClick);
			document.removeEventListener('touchstart', this.handleOutsideMouseClick);
		}

		this.closePortal();
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	renderPortal(props) {
		var trigger = this.trigger,
			styler = Pod_Styler.getStyle({props: {
				styler: {
					styleLike: 'Portal'
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
	}

	render() {
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
	}

	openPortal(props, e) {
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
	}

	closePortal() {
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
	}

	handleOutsideMouseClick(e) {
		if (!this.state.active) { return; }
		if (isNodeInRoot(e.target, findDOMNode(this.portal)) || e.target.tagName === 'HTML') { return; }
		e.stopPropagation();
		this.closePortal();
	}

	handleKeydown(e) {
		// ESC
		if (e.keyCode === 27 && this.state.active) {
			this.closePortal();
		}
	}
};
