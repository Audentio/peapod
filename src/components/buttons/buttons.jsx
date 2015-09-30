/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */
 
var Pea_button = React.createClass({
    
  getDefaultProps: function() {
    return {
      label: 'Submit',
			kind: 'default' //btn-default
    };
  },
	
	handleClick: function() {
		//--TBD
		console.log(this.props);
	},
  
  render: function() {
	
    var className = "btn btn-" + this.props.kind;
    
		if (this.props.className){ // className property exists
		
			// append ClassName added as property
			className += " " + this.props.className
			
		}
		
		// Raised
    if (this.props.raised) { 
      className += " btn--raised"
    }
    
		// Round (pill)
    if (this.props.round) {
      className += " btn--round"
    }
    
		// Disabled button
    if (this.props.disabled) {
      className += " btn--disabled"
    }
		
    //Anchor tag <a> if href specified
    if (this.props.href) {
      return (
        <a
          href={this.props.href}
          className={className}
					style={this.props.style}
          onClick={this.handleClick}>
          {this.props.label} {this.props.children}
        </a>
      );
    }
    
    //Default: <button> tag
    else {
      return (
        <button
          className={className}
					style={this.props.style}
          onClick={this.handleClick}>
          {this.props.label}
        </button>
      );
    }
  }
    
});