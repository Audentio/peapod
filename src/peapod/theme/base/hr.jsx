var Pod_Vars = require('../../vars.jsx');

module.exports = [
	{
		global: {
            height: '1px',
			borderWidth: 0,
			backgroundColor: '$palette.grey200',
			margin: Pod_Vars.get('gutter.internal') + ' auto' //in case someone puts a width it will center
		}
	}
]
