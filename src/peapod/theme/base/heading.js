import {Sheet} from '../../stylesheet.jsx';

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
       fontSize: '$font.size.display3',
       marginBottom:'$font.size.xxxlarge',
    }
});

h2.addSelector({
    common:{
       fontSize: '$font.size.display2',
       marginBottom:'$font.size.xxlarge',
    }
});

h3.addSelector({
    common:{
       fontSize: '$font.size.display1',
       marginBottom:'$font.size.xlarge',
    }
});

h4.addSelector({
    common:{
       fontSize: '$font.size.headline',
       marginBottom:'$font.size.large',
    }
});

h5.addSelector({
    common:{
       fontSize: '$font.size.title',
       marginBottom:'$font.size.normal',
    }
});

h6.addSelector({
    common:{
       fontSize: '$font.size.subheading',
       marginBottom:'$font.size.small',
    }
});

module.exports = sheet;
