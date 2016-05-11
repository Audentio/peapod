import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('testimonial');
var main = sheet.addMain();
var photo = sheet.addPart('photo');
var blockQuote = sheet.addPart('blockQuote');

// Conditions

//Variables
sheet.setValues({

});


main.addSelector({
    common: {
        textAlign: 'center'
    }
})
photo.addSelector({
    common: {
        maxHeight: '100px',
        maxWidth: '100px',
        borderRadius: '1000px'
    }
})
blockQuote.addSelector({
    common: {
        background: 'transparent',
        border: 'none'
    }
});

module.exports = sheet;
