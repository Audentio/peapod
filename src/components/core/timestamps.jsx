/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */
 
 
/**
* Create live timestamp from valid date.
*
* @element Pea_liveTimestamp
* @property {(string|Object)} time - IETF-compliant RFC 2822 timestamp string or Date Object 
*/
var Pea_liveTimestamp = React.createClass({
	
	/**
	* return the amount of seconds elapsed since {this.props.time}
	* @function
	* @returns {Number} seconds elapsed
	*/
	timeElapsed: function(){
		return Math.ceil( ( new Date().getTime() - this.timestamp.getTime() ) / 1000 )
	},
	
	
	getInitialState: function() {
	
		//create date object from datetime string. Skip if type != string
		this.timestamp = (typeof this.props.time == 'string') ? new Date(this.props.time) : this.props.time
		
		return {
			timeElapsed: this.timeElapsed()
		};
		
	},


	componentDidMount: function(){
	
		var self = this;
		
		//start repeater
		this._timer = setInterval(function(){
			self.setState({ timeElapsed: self.state.timeElapsed+1 })
		}, 1000)
		
	},
	
	
	componentWillUnmount: function(){
	
		//stop repeater
		window.clearTimeout( this._timer ) ;
		
	},
	
	
	render: function() {
	
		return (
			<span>{this.state.timeElapsed} seconds elapsed</span>
		);
		
	}
    
});
