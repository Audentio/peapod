
/*! Peapod {{package.version}}
 *  Copyright Audentio {{package.year}}
 *  LICENCE: {{package.licence}}
 */

var Pea_button = React.createClass({
    
	getDefaultProps: function() {
		return {
			kind: 'default',
			label: 'Submit',
			style: {}
		};
	},
	
	handleClick: function() {
		console.log(this.props);
	},
	
	//Create and export default style settings
	//self-invoked
	styling: (function(){
	
		//private: Object 
		//Default style values
		var style = {
		
			//Button base style
			base: {
				display						: 'inline-block',
				
				textDecoration				: 'none',
				
				borderRadius				: peapod.config['border-radius'],
				border						: '0px solid transparent',
				
				padding						: peapod.elSize(),
				
				backgroundColor				: '#444',
				
				color						: '#fff',
				
				marginRight: '4px'
			},
			
			//Round(pill) style
 			round: {
				borderRadius				: '1000px'
			},
			
			//Kind: primary
			kind_primary: {
				backgroundColor				: peapod.config['brand-primary'],
				color						: 'white'
			},
			
			//Kind: success
			kind_success: {
				backgroundColor				: peapod.config['brand-success'],
				color						: 'white'
			},
			
			//Kind: danger
			kind_danger: {
				backgroundColor				: peapod.config['brand-danger'],
				color						: 'white'
			},
			
			//Kind: warning
			kind_warning: {
				backgroundColor				: peapod.config['brand-warning'],
				color						: 'white'
			}
		
		}
		
		
		//Export to global object
		//Doing this allows overriding style properties from outside the component
		
		peapod.style.Pea_button = peapod.style.Pea_button || {}; // Create style object If it doesn't exist
		
		_.defaults( peapod.style.Pea_button, style ); // Assign default values
	
	})(),
	
	style: peapod.style.Pea_button,
	
	render: function() {
	
		var btnStyle = peapod.createStyle([
							this.style.base,
							this.props.kind && this.style['kind_'+this.props.kind],
							this.props.round && this.style.round,
							this.props.style //passed as argument
						])
	
		//Anchor tag <a> if href specified
		if (this.props.href) {
			return (
				<a
					href={this.props.href}
					style={btnStyle}
					onClick={this.handleClick}>
					{this.props.label} {this.props.children}
				</a>
			);
		}
		
		//Default: <button> tag
		else {
			console.log(this.style['kind_'+this.props.kind] && this.props.kind)
			return (
				<button
					style={btnStyle}
					onClick={this.handleClick}>
					{this.props.label}
				</button>
			);
		}
	}
    
});