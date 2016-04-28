import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
	main = sheet.addMain();

//Conditions

//Variables
sheet.setValues({});

main.addSelector({
    common:{
	   marginBottom: '$font.margins.body1',
       fontSize: '$font.size.body1'
    }
})

module.exports = sheet;
