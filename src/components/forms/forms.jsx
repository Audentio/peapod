/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENCE: <%= package.licence %>
 */


// @component Text Input
// 
// @Properties
// --[placeholder](str)
//		DOM placeholder text (as opposed to psuedo element used by native placeholder)
//
// --[type](str)
//		Text or password
//

var Pea_textInput = React.createClass({

	getInitialState: function() {
		return {
			value: this.props.value,
			placeholder: (this.props.value && this.props.value.length > 1) ? undefined : this.props.placeholder //undefined if value prop exists
		};
	},
	
	onChangeHandler: function(e){
	
		var VALUE = e.target.value;
		
		this.setState({  value : VALUE  });
		
		if ( VALUE.length > 0 ) { // non-empty value
		
			this.setState({  placeholder : ''  })
			
		} else if ( VALUE.length == 0 ) {
		
			this.setState({  placeholder : this.props.placeholder  })
			
		}
		
	},
	
	render: function() {
	
		var className = 'Pea_textInput';
		
		if (this.props.className) { // className property exists
			className = className + ' ' + this.props.className
		}
	
		return (
			<div style={this.props.style} className={className}>
				<span className="Pea_textInput__placeholder">{this.state.placeholder}</span>
				<input type="text" value={this.state.value} onChange={this.onChangeHandler} />
			</div>
		);
	}
    
});




// @component Checkbox
// 
// @Properties
// --[checked](bool)
//		checkbox checked state
// --[label](str)
//		Text label after checkbox
//
var Pea_checkbox = React.createClass({
	getInitialState: function() {
		return {
			checked: this.props.checked,
			className: (this.props.checked) ? "Pea_checkbox Pea_checkbox--checked" : "Pea_checkbox"
		}
	},
	
	onChangeHandler: function(e){
	
		this.setState({
			className: (e.target.checked) ? "Pea_checkbox Pea_checkbox--checked" : "Pea_checkbox",
			checked: e.target.checked
		})
		
	},
	
	render: function(){
		var className = (this.props.kind) ? ' Pea_checkbox--'+this.props.kind : '';
		var labelStyle = (this.props.label) ? {}:{display:'none'};
	
		return (
			<label className={this.state.className + className}>
				<span className="Pea_checkbox__box">
					<input onChange={this.onChangeHandler} className="Pea_checkbox__input" type="checkbox" checked={this.state.checked} />
					<span className="Pea_checkbox__icon"></span>
					<span className="Pea_checkbox__base"></span>
				</span>
				
				<span style={labelStyle} className="Pea_checkbox__label">{this.props.label}</span>
			</label>
		);
	}
})



// @component Select *** TBD ***
// 
// @Properties
// --children(Node)
//		Option tags
// --[value](str)
//		input value. <option> with corresponding value must exist
// --[placeholder](str)
//		placeholder text
//

var Pea_select = React.createClass({

	getInitialState: function() {
		return {
			value: this.props.value,
			placeholder: (this.props.value && this.props.value.length > 1) ? undefined : this.props.placeholder //undefined if value prop exists
		};
	},
	
	onChangeHandler: function(e){
	
		var VALUE = e.target.value;
		
		this.setState({  value : VALUE  });
		
		if ( VALUE.length > 0 ) { // non-empty value
		
			this.setState({  placeholder : ''  })
			
		} else if ( VALUE.length == 0 ) {
		
			this.setState({  placeholder : this.props.placeholder  })
			
		}
		
	},
	
	render: function() {
	
		var className = 'Pea_textInput';
		
		if (this.props.className) { // className property exists
			className = className + ' ' + this.props.className
		}
	
		return (
			<div style={this.props.style} className={className}>
				<span className="Pea_select__placeholder">{this.state.placeholder}</span>
				<span className="Pea_select__value">{this.state.value}</span>
				<select onChange={this.onChangeHandler}>
					{this.props.children}
				</select>
			</div>
		);
	}
    
});