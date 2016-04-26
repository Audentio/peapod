import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
	main = sheet.addMain();

//Conditions

//Variables
sheet.setValues({});

main.addSelector({
	common: {
        backgroundColor: '$palette.blue50',
        color: '$palette.blue700',
        padding: '2px',
        fontSize: '85%',
		fontFamily: '$font.family.code'
	}
})

module.exports = sheet;
