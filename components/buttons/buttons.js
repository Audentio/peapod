var PP_Button = React.createClass({
    
  getDefaultProps: function() {
    return {
      class: '',
      label: 'Submit'
    };
  },
  
  render: function() {
    
    var ripple = function(){
      //wut
    }
    
    var styleClass = (this.props.style) ? "btn-"+this.props.style : "";
    
    if (this.props.raised) {
      styleClass += " btn--raised"
    }
    
    //Anchor tag <a> if href specified
    if (this.props.href) {
      return (
        <a
          href={this.props.href}
          className={"btn " + styleClass + this.props.class}
          onClick={this.props.onClick}>
          {this.props.label}
        </a>
      );
    }
    
    //Default: <button> tag
    else {
      return (
        <button
          className={"btn " + styleClass + this.props.class}
          onClick={this.props.onClick}>
          {this.props.label}
        </button>
      );
    }
  }
    
});