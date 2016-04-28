import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
    h1 = sheet.addPart('h1'),
    h2 = sheet.addPart('h2'),
    h3 = sheet.addPart('h3'),
    h4 = sheet.addPart('h4'),
    h5 = sheet.addPart('h5'),
    h6 = sheet.addPart('h6');

//Conditions

//Variables
sheet.setValues({
    common: {
        heading: {
            textTransform: 'uppercase'
        }
    }
});

h1.addSelector({
    common:{
       fontSize: '$font.size.xxxlarge',
       marginBottom:'$font.size.xxxlarge',
    }
});

h2.addSelector({
    common:{
       fontSize: '$font.size.xxlarge',
       marginBottom:'$font.size.xxlarge',
    }
});

h3.addSelector({
    common:{
       fontSize: '$font.size.xlarge',
       marginBottom:'$font.size.xlarge',
    }
});

h4.addSelector({
    common:{
       fontSize: '$font.size.large',
       marginBottom:'$font.size.large',
    }
});

h5.addSelector({
    common:{
       fontSize: '$font.size.normal',
       marginBottom:'$font.size.normal',
    }
});

h6.addSelector({
    common:{
       fontSize: '$font.size.small',
       marginBottom:'$font.size.small',
    }
});

module.exports = sheet;
