import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
	main = sheet.addMain();

//Conditions

//Variables
sheet.setValues({
    common: {
        section: {
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '$palette.grey200',
            padding: '$gutter.large'
        }
    }
});


main.addSelector({
    common: {
        borderBottomWidth: '$section.borderWidth',
        borderBottomStyle: '$section.borderStyle',
        borderBottomColor: '$section.borderColor',
        paddingTop: '$section.padding',
        paddingBottom: '$section.padding'
    }
})

module.exports = sheet;
