import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
	main = sheet.addMain();

//Conditions

//Variables
sheet.setValues({});

main.addSelector({
    common:{
	   marginBottom: '$gutter.internal'
    }
})

module.exports = sheet;
